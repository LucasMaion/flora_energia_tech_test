export class UserEntity {
    constructor(
        public id: number,
        public email: string,
        public password: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deleted_at: Date | null
    ) { }

    static create(
        id: number,
        email: string,
        password: string,
        name: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        deleted_at: Date | null = null
    ): UserEntity {
        return new UserEntity(id, email, password, name, createdAt, updatedAt, deleted_at);
    }
}