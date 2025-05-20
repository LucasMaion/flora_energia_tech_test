import { UserEntity } from "./user.entity";
import { WordEntity } from "./word.entity";

export class FavoriteEntity {
    constructor(
        public word: WordEntity,
        public user: UserEntity,
        public createdAt: Date,
        public updatedAt: Date,
        public deleted_at: Date | null
    ) { }

    static create(
        word: WordEntity,
        user: UserEntity,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        deleted_at: Date | null = null
    ): FavoriteEntity {
        return new FavoriteEntity(word, user, createdAt, updatedAt, deleted_at);
    }
}