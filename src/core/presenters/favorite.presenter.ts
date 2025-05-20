import { FavoriteEntity } from "../domain/entities/favorite.entity";

export class FavoritePresenter {
    static presentFavorite(favorite: FavoriteEntity): any {
        return {
            word: favorite.word.word,
            added: favorite.createdAt,
        };
    }

    static presentFavorites(favorites: FavoriteEntity[]) {
        return favorites.map((favorite) => this.presentFavorite(favorite));
    }
}
