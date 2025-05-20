import { UserTypeOrmRepository } from "../../gateways/driven/infra/repositories/user.typeorm.repository";
import { UserUseCase } from "../applications/user.use_case";
import { UserNotFoundError } from "../exceptions/user_not_found.exception";
import { FavoritePresenter } from "../presenters/favorite.presenter";
import { UserPresenter } from "../presenters/user.presenter";
import { UserHistoryPresenter } from "../presenters/user_history.presenter";
import { QueryMetaOptions } from "../types/query_meta_options.type";
import { comparePasswords, hashPassword } from "../utilities/password.hash";

export class UserController {
    private userUseCase: UserUseCase
    constructor(
    ) {
        this.userUseCase = new UserUseCase(new UserTypeOrmRepository());
    }

    async getUser(id: number) {
        const user = await this.userUseCase.getUserById(id);
        if (!user) throw new UserNotFoundError("Usuário ou senha incorretos.");
        return UserPresenter.presentBasicUser(user);
    }

    async signin(email: string, password: string) {
        const user = await this.userUseCase.find(email);
        if (!user) throw new UserNotFoundError("Usuário ou senha incorretos.");
        if (!(await comparePasswords(password, user.password))) throw new UserNotFoundError("Usuário ou senha incorretos.");
        return UserPresenter.presentBasicUser(user);
    }

    async signup(email: string, password: string, name: string) {
        const hashedPassword = await hashPassword(password);
        const user = await this.userUseCase.createUser({ email, password: hashedPassword, name });
        return UserPresenter.presentBasicUser(user);
    }

    async getUserFavorites(id: number, metaOptions: QueryMetaOptions) {
        const user = await this.userUseCase.getUserById(id);
        if (!user) throw new UserNotFoundError("Usuário ou senha incorretos.");
        const favorites = await this.userUseCase.getUserFavorites(user, metaOptions);
        return {
            results: FavoritePresenter.presentFavorites(favorites.results),
            ...favorites.metadata
        };
    }

    async getUserSearchHistory(id: number, metaOptions: QueryMetaOptions) {
        const user = await this.userUseCase.getUserById(id);
        if (!user) throw new UserNotFoundError("Usuário ou senha incorretos.");
        const searchHistory = await this.userUseCase.getSearchHistory(user, metaOptions);
        return {
            results: UserHistoryPresenter.presentUserHistories(searchHistory.results),
            ...searchHistory.metadata
        };
    }
}
