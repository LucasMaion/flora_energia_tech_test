import { UserEntity, WordEntity } from '../entities';

export class WordAggregate {
    word: WordEntity;
    favoredBy: UserEntity[];
    constructor(
        word: WordEntity,
        favoredBy: UserEntity[],
    ) {
        this.word = word;
        this.favoredBy = favoredBy;
    }

    setDetail(wordDetail: any) {
        this.word.wordDetail = wordDetail;
    }
}