import { WordAggregate } from "../domain/aggregates/word.aggregate";
import { ListWordsOptions } from "../types/list_word_options.type";
import { QueryMetaOptions } from "../types/query_meta_options.type";
import { QueryResponse } from "../types/query_response.type";

export interface WordRepository {
    findByWord(word: string): Promise<WordAggregate | null>
    findById(id: number): Promise<WordAggregate | null>
    list(userId: ListWordsOptions, metaOptions: QueryMetaOptions): Promise<QueryResponse<WordAggregate>>;
    favorite(word: string, userId: number): Promise<void>;
    unfavorite(word: string, userId: number): Promise<void>;
    getWordDetail(word: string): Promise<WordAggregate>;
}