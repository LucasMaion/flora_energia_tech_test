import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../datasources/database";
import { UserRepository } from "../../../../core/repositories/user.repositories";
import { UserEntity } from "../../../../core/domain/entities";
import { UserTypeOrmEntity } from "../entities/user.entity";
import { UserSearchHistoryTypeOrmEntity } from "../entities/user_search_history.entity";
import { UserEntityMapper } from "../../mappers/user_entity.mapper";
import { FindUserOptions } from "../../../../core/types/find_user_options.type";
import { WordTypeOrmEntity } from "../entities/words.entity";
import { QueryMetaOptions } from "../../../../core/types/query_meta_options.type";
import { QueryResponse } from "../../../../core/types/query_response.type";
import { UserHistoryEntity } from "../../../../core/domain/entities/user_history.entity";
import { FavoriteEntity } from "../../../../core/domain/entities/favorite.entity";
import { UserHistoryEntityMapper } from "../../mappers/user_history.mapper";
import { FavoriteEntityMapper } from "../../mappers/favorite_entity.mapper";
import { FavoriteTypeOrmEntity } from "../entities/favorite.entity";
import { addCursorQuery, getCursorMetadata } from "../utilities/cursor_metadata.utils";
import { WordNotFoundError } from "../../../../core/exceptions/word_not_found.exception";

export class UserTypeOrmRepository implements UserRepository {
    private wordRepository: Repository<WordTypeOrmEntity>;
    private searchHistoryRepository: Repository<UserSearchHistoryTypeOrmEntity>;
    private userRepository: Repository<UserTypeOrmEntity>;
    private favoriteRepository: Repository<FavoriteTypeOrmEntity>;

    constructor() {
        this.searchHistoryRepository = AppDataSource.getRepository(UserSearchHistoryTypeOrmEntity);
        this.userRepository = AppDataSource.getRepository(UserTypeOrmEntity);
        this.wordRepository = AppDataSource.getRepository(WordTypeOrmEntity);
        this.favoriteRepository = AppDataSource.getRepository(FavoriteTypeOrmEntity);
    }

    async find(options: FindUserOptions): Promise<UserEntity | null> {
        const user = await this.userRepository.findOneBy(options);

        return user ? new UserEntityMapper(user).parseToDomain() : null;
    }
    async findById(id: number): Promise<UserEntity | null> {
        const user = await this.userRepository.findOneBy({ id });

        return user ? new UserEntityMapper(user).parseToDomain() : null;
    }

    async create(userData: Partial<UserEntity>): Promise<UserEntity> {
        const user = this.userRepository.create(userData);
        const savedUser = await this.userRepository.save(user);
        return new UserEntityMapper(savedUser).parseToDomain();
    }

    async getSearchHistory(id: number, metaOptions: QueryMetaOptions): Promise<QueryResponse<UserHistoryEntity>> {

        let query = this.searchHistoryRepository.createQueryBuilder("search");
        query.leftJoinAndSelect("search.word", "word")
        query.leftJoinAndSelect("search.user", "user")
        query.where("user.id = :id", { id });

        query = addCursorQuery(query, metaOptions, "search.id") as SelectQueryBuilder<UserSearchHistoryTypeOrmEntity>;
        const searchHistory = await query.getMany()
        const totalDocs = await this.searchHistoryRepository.count();

        const cursorMetadata = getCursorMetadata(searchHistory, metaOptions, totalDocs);
        const results = searchHistory.map(search => new UserHistoryEntityMapper(search).parseToDomain());
        return {
            results,
            metadata: cursorMetadata,
        }
    }

    async addSearchHistory(id: number, words: string[]): Promise<void> {
        const newHistoryEntries = await Promise.all(words.map(async (word) => {
            const foundWord = await this.wordRepository.findOneBy({ word });
            if (!foundWord) {
                throw new WordNotFoundError("Palavra não encontrada");
            }
            return this.searchHistoryRepository.create({
                user: { id },
                word: { id: foundWord.id },
            })
        }));
        await this.searchHistoryRepository.save(newHistoryEntries);
    }

    async getFavorites(id: number, metaOptions: QueryMetaOptions): Promise<QueryResponse<FavoriteEntity>> {
        let query = this.favoriteRepository.createQueryBuilder("favorite");
        query.leftJoinAndSelect("favorite.word", "word")
        query.leftJoinAndSelect("favorite.user", "user")
        query.where("user.id = :user_id", { user_id: id });

        query = addCursorQuery(query, metaOptions, "favorite.id") as SelectQueryBuilder<FavoriteTypeOrmEntity>;
        const favorites = await query.getMany()
        const totalDocs = await this.favoriteRepository.count();

        const cursorMetadata = getCursorMetadata(favorites, metaOptions, totalDocs);
        const results = favorites.map(favorite => new FavoriteEntityMapper(favorite).parseToDomain());
        return {
            results,
            metadata: cursorMetadata,
        }
    }
}

