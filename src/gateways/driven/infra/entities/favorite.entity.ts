import { GenericEntity } from "./generic.entity";
import { Entity, Index, ManyToOne, JoinColumn } from "typeorm";
import { UserTypeOrmEntity } from "./user.entity";
import { WordTypeOrmEntity } from "./words.entity";

@Index("favorite_pkey", ["id"], { unique: true })
@Entity("favorite", { schema: "public" })
export class FavoriteTypeOrmEntity extends GenericEntity {

    @ManyToOne(() => UserTypeOrmEntity, (user) => user.favorites, { cascade: false })
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: UserTypeOrmEntity;

    @ManyToOne(() => WordTypeOrmEntity, (word) => word.favorites, { cascade: false })
    @JoinColumn([{ name: "word_id", referencedColumnName: "id" }])
    word: WordTypeOrmEntity;

}
