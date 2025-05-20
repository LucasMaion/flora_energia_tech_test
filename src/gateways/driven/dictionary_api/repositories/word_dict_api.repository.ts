import axios from "axios";

import { WordAggregate } from "../../../../core/domain/aggregates/word.aggregate";
import { WordRepository } from "../../../../core/repositories/word.repository";
import { ListWordsOptions } from "../../../../core/types/list_word_options.type";
import { QueryMetaOptions } from "../../../../core/types/query_meta_options.type";
import { QueryResponse } from "../../../../core/types/query_response.type";
import { WordNotFoundError } from "../../../../core/exceptions/word_not_found.exception";

export class WordDictApiRepository implements WordRepository {

    async findByWord(word: string): Promise<WordAggregate | null> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<WordAggregate | null> {
        throw new Error("Method not implemented.");
    }

    async list(options: ListWordsOptions, metaOptions: QueryMetaOptions): Promise<QueryResponse<WordAggregate>> {
        throw new Error("Method not implemented.");
    }

    async favorite(word: string, id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async unfavorite(word: string, id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getWordDetail(word: string): Promise<any> {
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        if (res.status !== 200) {
            throw new WordNotFoundError("Palavra não encontrada no dicionário!");
        }
        return res.data[0];
    }
}
