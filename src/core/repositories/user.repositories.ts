import { WordAggregate } from "../domain/aggregates/word.aggregate";
import { UserEntity } from "../domain/entities";
import { FavoriteEntity } from "../domain/entities/favorite.entity";
import { UserHistoryEntity } from "../domain/entities/user_history.entity";
import { FindUserOptions } from "../types/find_user_options.type";
import { QueryMetaOptions } from "../types/query_meta_options.type";
import { QueryResponse } from "../types/query_response.type";

export interface UserRepository {
    find(options: FindUserOptions): Promise<UserEntity | null>;
    findById(id: number): Promise<UserEntity | null>;
    create(userData: Partial<UserEntity>): Promise<UserEntity>;
    getSearchHistory(id: number, metaOptions: QueryMetaOptions): Promise<QueryResponse<UserHistoryEntity>>;
    addSearchHistory(id: number, words: string[]): Promise<void>;
    getFavorites(id: number, metaOptions: QueryMetaOptions): Promise<QueryResponse<FavoriteEntity>>;
}