import { FavoriteEntity } from "../../../core/domain/entities/favorite.entity";
import { FavoriteTypeOrmEntity } from "../infra/entities/favorite.entity";
import { UserEntityMapper } from "./user_entity.mapper";
import { WordEntityMapper } from "./word_entity.mapper";

export class FavoriteEntityMapper {
    private typeOrmFavoriteEntity: FavoriteTypeOrmEntity

    constructor(typeOrmFavoriteEntity: FavoriteTypeOrmEntity) {
        this.typeOrmFavoriteEntity = typeOrmFavoriteEntity
    }

    parseToDomain(): FavoriteEntity {
        const wordEntityMapper = new WordEntityMapper(this.typeOrmFavoriteEntity.word)
        const userEntityMapper = new UserEntityMapper(this.typeOrmFavoriteEntity.user)
        return new FavoriteEntity(
            wordEntityMapper.parseToDomain(),
            userEntityMapper.parseToDomain(),
            this.typeOrmFavoriteEntity.createdAt,
            this.typeOrmFavoriteEntity.updatedAt,
            this.typeOrmFavoriteEntity.deletedAt
        )
    }
}