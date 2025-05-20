export class WordEntity {
    constructor(
        public id: number,
        public word: string,
        public wordDetail: any | null,
        public createdAt: Date,
        public updatedAt: Date,
        public deleted_at: Date | null,
    ) { }

    static create(
        id: number,
        word: string,
        wordDetail: any | null,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        deleted_at: Date | null = null
    ): WordEntity {
        return new WordEntity(id, word, wordDetail, createdAt, updatedAt, deleted_at);
    }
}