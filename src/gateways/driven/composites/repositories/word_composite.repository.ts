import { WordAggregate } from "../../../../core/domain/aggregates/word.aggregate";
import { WordNotFoundError } from "../../../../core/exceptions/word_not_found.exception";
import { WordRepository } from "../../../../core/repositories/word.repository";
import { ListWordsOptions } from "../../../../core/types/list_word_options.type";
import { QueryMetaOptions } from "../../../../core/types/query_meta_options.type";
import { QueryResponse } from "../../../../core/types/query_response.type";

export class WordCompositeRepository implements WordRepository {
    constructor(
        private dbRepo: WordRepository,
        private apiRepo: WordRepository
    ) {
        this.dbRepo = dbRepo;
        this.apiRepo = apiRepo;
    }

    async findByWord(word: string): Promise<WordAggregate | null> {
        return await this.dbRepo.findByWord(word)
    }

    async findById(id: number): Promise<WordAggregate | null> {
        return await this.dbRepo.findById(id)
    }

    async list(options: ListWordsOptions, metaOptions: QueryMetaOptions): Promise<QueryResponse<WordAggregate>> {
        return await this.dbRepo.list(options, metaOptions)
    }

    async favorite(word: string, id: number): Promise<void> {
        await this.dbRepo.favorite(word, id)
    }

    async unfavorite(word: string, id: number): Promise<void> {
        await this.dbRepo.unfavorite(word, id)
    }

    async getWordDetail(word: string): Promise<WordAggregate> {
        const wordData = await this.dbRepo.findByWord(word)
        if (!wordData) {
            throw new WordNotFoundError("Palavra não encontrada");
        }
        const wordDetail = await this.apiRepo.getWordDetail(word)
        if (!wordDetail) {
            throw new WordNotFoundError("Palavra não encontrada no dicionário!");
        }
        wordData.setDetail(wordDetail);
        return wordData
    }

}
