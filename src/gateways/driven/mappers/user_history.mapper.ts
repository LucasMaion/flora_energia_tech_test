import { UserHistoryEntity } from "../../../core/domain/entities/user_history.entity";
import { UserSearchHistoryTypeOrmEntity } from "../infra/entities/user_search_history.entity";
import { UserEntityMapper } from "./user_entity.mapper";
import { WordEntityMapper } from "./word_entity.mapper";

export class UserHistoryEntityMapper {
    private typeOrmUserHistoryEntity: UserSearchHistoryTypeOrmEntity

    constructor(typeOrmUserHistoryEntity: UserSearchHistoryTypeOrmEntity) {
        this.typeOrmUserHistoryEntity = typeOrmUserHistoryEntity
    }

    parseToDomain(): UserHistoryEntity {
        const wordEntityMapper = new WordEntityMapper(this.typeOrmUserHistoryEntity.word)
        const userEntityMapper = new UserEntityMapper(this.typeOrmUserHistoryEntity.user)
        return new UserHistoryEntity(
            wordEntityMapper.parseToDomain(),
            userEntityMapper.parseToDomain(),
            this.typeOrmUserHistoryEntity.createdAt,
            this.typeOrmUserHistoryEntity.updatedAt,
            this.typeOrmUserHistoryEntity.deletedAt
        )
    }
}