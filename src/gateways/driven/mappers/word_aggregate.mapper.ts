import { WordAggregate } from "../../../core/domain/aggregates/word.aggregate";
import { WordTypeOrmEntity } from "../infra/entities/words.entity";
import { UserEntityMapper } from "./user_entity.mapper";
import { WordEntityMapper } from "./word_entity.mapper";

export class WordAggregateMapper {
    private typeOrmWordEntity: WordTypeOrmEntity

    constructor(typeOrmWordEntity: WordTypeOrmEntity) {
        this.typeOrmWordEntity = typeOrmWordEntity
    }

    parseToDomain(): WordAggregate {
        const word = new WordEntityMapper(
            this.typeOrmWordEntity
        ).parseToDomain()

        const users = this.typeOrmWordEntity.favorites?.map((favorite) => {
            const userDto = new UserEntityMapper(favorite.user)
            return userDto.parseToDomain()
        })

        return new WordAggregate(
            word,
            users
        )
    }
}