import { WordAggregate } from "../domain/aggregates/word.aggregate";
import { UserEntity } from "../domain/entities";
import { BadRequestError } from "../exceptions/bad_request.exception";
import { WordNotFoundError } from "../exceptions/word_not_found.exception";
import { WordRepository } from "../repositories/word.repository";
import { ListWordsOptions } from "../types/list_word_options.type";
import { QueryMetaOptions } from "../types/query_meta_options.type";
import { QueryResponse } from "../types/query_response.type";

export class WordUseCase {
    constructor(private wordRepository: WordRepository) { }

    async getWordDetail(word: string): Promise<WordAggregate | null> {
        return this.wordRepository.getWordDetail(word);
    }

    async listWords(options: ListWordsOptions, metaOptions: QueryMetaOptions): Promise<QueryResponse<WordAggregate>> {
        return await this.wordRepository.list(options, metaOptions);
    }

    async favorite(word: string, user: UserEntity): Promise<void> {
        const foundWord = await this.wordRepository.findByWord(word)
        if (!foundWord) {
            throw new WordNotFoundError("Palavra não encontrada");
        }
        if (foundWord.favoredBy?.find((user) => user.id === user.id)) {
            throw new BadRequestError("Palavra já favoritada");
        }
        await this.wordRepository.favorite(word, user.id);
    }

    async unfavorite(word: string, user: UserEntity): Promise<void> {
        const foundWord = await this.wordRepository.findByWord(word)
        if (!foundWord) {
            throw new WordNotFoundError("Palavra não encontrada");
        }
        if (!foundWord.favoredBy?.find((user) => user.id === user.id)) {
            throw new BadRequestError("Palavra já não está favoritada");
        }
        await this.wordRepository.unfavorite(word, user.id);
    }
}