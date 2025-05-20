import { UserEntity } from "./user.entity";
import { WordEntity } from "./word.entity";

export class UserHistoryEntity {
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
    ): UserHistoryEntity {
        return new UserHistoryEntity(word, user, createdAt, updatedAt, deleted_at);
    }
}