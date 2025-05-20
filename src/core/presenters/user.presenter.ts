import { WordAggregate } from "../domain/aggregates/word.aggregate";
import { UserEntity } from "../domain/entities";

export class UserPresenter {
    static presentCompleteUser(user: UserEntity) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        };
    }

    static presentBasicUser(user: UserEntity) {
        return {
            id: user.id,
            name: user.name,
        };
    }

    static presentUserHistory(history: WordAggregate[]) {
        return history.map((aggregate) => ({
            word: aggregate.word.word,
            added: aggregate.word.createdAt,
        }));
    }

    static presentUserFavorites(favorites: WordAggregate[]) {
        return favorites.map((aggregate) => ({
            word: aggregate.word.word,
            added: aggregate.word.createdAt,
        }));
    }
}
