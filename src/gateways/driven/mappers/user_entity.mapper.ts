import { UserEntity } from "../../../core/domain/entities";
import { UserTypeOrmEntity } from "../infra/entities/user.entity";

export class UserEntityMapper {
    private typeOrmUserEntity: UserTypeOrmEntity

    constructor(typeOrmUserEntity: UserTypeOrmEntity) {
        this.typeOrmUserEntity = typeOrmUserEntity
    }

    parseToDomain(): UserEntity {
        return new UserEntity(
            this.typeOrmUserEntity.id,
            this.typeOrmUserEntity.email,
            this.typeOrmUserEntity.password,
            this.typeOrmUserEntity.name,
            this.typeOrmUserEntity.createdAt,
            this.typeOrmUserEntity.updatedAt,
            this.typeOrmUserEntity.deletedAt

        )
    }
}