import { WordAggregate } from "../domain/aggregates/word.aggregate";
import { UserEntity } from "../domain/entities";
import { FavoriteEntity } from "../domain/entities/favorite.entity";
import { UserHistoryEntity } from "../domain/entities/user_history.entity";
import { UserRepository } from "../repositories/user.repositories";
import { QueryMetaOptions } from "../types/query_meta_options.type";
import { QueryResponse } from "../types/query_response.type";

export class UserUseCase {
    constructor(private userRepository: UserRepository) { }

    async find(email: string): Promise<UserEntity | null> {
        return await this.userRepository.find({ email });
    }
    async getUserById(id: number): Promise<UserEntity | null> {
        return await this.userRepository.findById(id);
    }

    async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
        return await this.userRepository.create(userData);
    }

    async getSearchHistory(user: UserEntity, metaOptions: QueryMetaOptions): Promise<QueryResponse<UserHistoryEntity>> {
        return await this.userRepository.getSearchHistory(user.id, metaOptions);
    }

    async addSearchHistory(user: UserEntity, words: string[]): Promise<void> {
        return await this.userRepository.addSearchHistory(user.id, words);
    }

    async getUserFavorites(user: UserEntity, metaOptions: QueryMetaOptions): Promise<QueryResponse<FavoriteEntity>> {
        return await this.userRepository.getFavorites(user.id, metaOptions);
    }
}