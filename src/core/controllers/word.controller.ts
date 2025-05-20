import { WordCompositeRepository } from "../../gateways/driven/composites/repositories/word_composite.repository";
import { WordDictApiRepository } from "../../gateways/driven/dictionary_api/repositories/word_dict_api.repository";
import { UserTypeOrmRepository } from "../../gateways/driven/infra/repositories/user.typeorm.repository";
import { WordTypeOrmRepository } from "../../gateways/driven/infra/repositories/word.typeorm.repository";
import { UserUseCase } from "../applications/user.use_case";
import { WordUseCase } from "../applications/word.use_case";
import { UserNotFoundError } from "../exceptions/user_not_found.exception";
import { WordNotFoundError } from "../exceptions/word_not_found.exception";
import { WordPresenter } from "../presenters/word.presenter";
import { QueryMetaOptions } from "../types/query_meta_options.type";


export class WordController {
    private wordUseCase: WordUseCase
    private userUseCase: UserUseCase
    constructor(
    ) {
        this.wordUseCase = new WordUseCase(new WordCompositeRepository(new WordTypeOrmRepository(), new WordDictApiRepository()));
        this.userUseCase = new UserUseCase(new UserTypeOrmRepository());
    }

    async getWordDetail(word: string, id: number) {
        const user = await this.userUseCase.getUserById(id);
        if (!user) throw new UserNotFoundError("Usuário ou senha incorretos.");

        const wordDetail = await this.wordUseCase.getWordDetail(word);
        if (!wordDetail) throw new WordNotFoundError("Palavra não encontrada");

        await this.userUseCase.addSearchHistory(user, [word]);

        return WordPresenter.presentWordDetail(wordDetail);
    }

    async listWords(search: string | undefined, metaOptions: QueryMetaOptions) {
        const words = await this.wordUseCase.listWords({ search }, metaOptions);
        return {
            results: WordPresenter.presentWords(words.results),
            ...words.metadata
        };
    }

    async favoriteWord(word: string, id: number) {
        const user = await this.userUseCase.getUserById(id);
        if (!user) throw new UserNotFoundError("Usuário ou senha incorretos.");
        await this.wordUseCase.favorite(word, user);
    }

    async unfavoriteWord(word: string, id: number) {
        const user = await this.userUseCase.getUserById(id);
        if (!user) throw new UserNotFoundError("Usuário ou senha incorretos.");
        await this.wordUseCase.unfavorite(word, user);
    }
}
