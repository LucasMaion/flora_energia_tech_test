import { Repository, SelectQueryBuilder } from "typeorm";
import { WordAggregate } from "../../../../core/domain/aggregates/word.aggregate";
import { WordRepository } from "../../../../core/repositories/word.repository";
import { ListWordsOptions } from "../../../../core/types/list_word_options.type";
import { AppDataSource } from "../datasources/database";
import { WordTypeOrmEntity } from "../entities/words.entity";
import { FavoriteTypeOrmEntity } from "../entities/favorite.entity";
import { WordAggregateMapper } from "../../mappers/word_aggregate.mapper";
import { QueryMetaOptions } from "../../../../core/types/query_meta_options.type";
import { QueryResponse } from "../../../../core/types/query_response.type";
import { addCursorQuery, getCursorMetadata } from "../utilities/cursor_metadata.utils";
import { WordNotFoundError } from "../../../../core/exceptions/word_not_found.exception";

export class WordTypeOrmRepository implements WordRepository {
    private wordRepository: Repository<WordTypeOrmEntity>;
    private favoriteRepository: Repository<FavoriteTypeOrmEntity>;

    constructor() {
        this.wordRepository = AppDataSource.getRepository(WordTypeOrmEntity);
        this.favoriteRepository = AppDataSource.getRepository(FavoriteTypeOrmEntity);
    }

    async findByWord(word: string): Promise<WordAggregate | null> {
        const foundWord = await this.wordRepository.find({
            where: { word: word },
            relations: ['favorites', 'favorites.user'],
            take: 1,
        });
        return foundWord.length > 0 ? new WordAggregateMapper(foundWord[0]).parseToDomain() : null;
    }

    async findById(id: number): Promise<WordAggregate | null> {
        const word = await this.wordRepository.find({
            where: { id: id },
            relations: ['favorites', 'favorites.user'],
            take: 1,
        });
        return word.length > 0 ? new WordAggregateMapper(word[0]).parseToDomain() : null;
    }

    async list(options: ListWordsOptions, metaOptions: QueryMetaOptions): Promise<QueryResponse<WordAggregate>> {
        let query = this.wordRepository.createQueryBuilder("word");

        if (options.search) {
            query.where("word.word ilike :word", { word: `%${options.search}%` });
        }
        query = addCursorQuery(query, metaOptions) as SelectQueryBuilder<WordTypeOrmEntity>;
        const words = await query.getMany()
        const totalDocs = await this.wordRepository.count();

        const cursorMetadata = getCursorMetadata(words, metaOptions, totalDocs);
        const results = words.map(word => new WordAggregateMapper(word).parseToDomain());
        return {
            results,
            metadata: cursorMetadata,
        }
    }

    async favorite(word: string, id: number): Promise<void> {
        const foundWord = await this.wordRepository.findOneBy({ word });
        if (!foundWord) {
            throw new WordNotFoundError("Palavra não encontrada");
        }
        const newFavorite = this.favoriteRepository.create({
            user: { id },
            word: { id: foundWord.id }
        });

        await this.favoriteRepository.save(newFavorite);
    }

    async unfavorite(word: string, id: number): Promise<void> {
        const favorite = await this.favoriteRepository.findOneBy({
            user: { id },
            word: { word }
        });

        if (favorite) {
            await this.favoriteRepository.softRemove(favorite);
        }
    }

    async getWordDetail(word: string): Promise<WordAggregate> {
        throw new Error("Method not implemented.");
    }
}
