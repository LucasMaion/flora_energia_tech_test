import { WordEntity } from "../../../core/domain/entities";
import { WordTypeOrmEntity } from "../infra/entities/words.entity";

export class WordEntityMapper {
    private typeOrmWordEntity: WordTypeOrmEntity
    private wordDetail: any | null

    constructor(typeOrmWordEntity: WordTypeOrmEntity, wordDetail: any | null = null) {
        this.wordDetail = wordDetail
        this.typeOrmWordEntity = typeOrmWordEntity
    }

    parseToDomain(): WordEntity {
        return new WordEntity(
            this.typeOrmWordEntity.id,
            this.typeOrmWordEntity.word,
            this.wordDetail,
            this.typeOrmWordEntity.createdAt,
            this.typeOrmWordEntity.updatedAt,
            this.typeOrmWordEntity.deletedAt

        )
    }
}