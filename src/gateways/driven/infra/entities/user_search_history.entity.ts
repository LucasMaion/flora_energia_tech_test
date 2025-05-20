import { GenericEntity } from "./generic.entity";
import { Entity, Index, ManyToOne, JoinColumn } from "typeorm";
import { UserTypeOrmEntity } from "./user.entity";
import { WordTypeOrmEntity } from "./words.entity";

@Index("user_search_history_pkey", ["id"], { unique: true })
@Entity("user_search_history", { schema: "public" })
export class UserSearchHistoryTypeOrmEntity extends GenericEntity {

    @ManyToOne(() => UserTypeOrmEntity, (user) => user.searchHistory, { cascade: false })
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: UserTypeOrmEntity;

    @ManyToOne(() => WordTypeOrmEntity, (word) => word.searchHistory, { cascade: false })
    @JoinColumn([{ name: "word_id", referencedColumnName: "id" }])
    word: WordTypeOrmEntity;

}
