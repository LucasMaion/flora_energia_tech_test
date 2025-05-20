import { UserHistoryEntity } from "../domain/entities/user_history.entity";

export class UserHistoryPresenter {
    static presentUserHistory(userHistory: UserHistoryEntity): any {
        return {
            word: userHistory.word.word,
            added: userHistory.createdAt,
        };
    }

    static presentUserHistories(userHistories: UserHistoryEntity[]) {
        return userHistories.map((userHistory) => this.presentUserHistory(userHistory));
    }
}
