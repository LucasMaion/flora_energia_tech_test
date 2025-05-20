import { FavoriteTypeOrmEntity } from "./favorite.entity";
import { GenericEntity } from "./generic.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { UserSearchHistoryTypeOrmEntity } from "./user_search_history.entity";

@Index("word_pkey", ["id"], { unique: true })
@Entity("word", { schema: "public" })
export class WordTypeOrmEntity extends GenericEntity {
    @Column("text", { name: "word", nullable: false, unique: true })
    word: string;

    @OneToMany(
        () => FavoriteTypeOrmEntity,
        (favorite) => favorite.word
    )
    favorites: FavoriteTypeOrmEntity[];

    @OneToMany(
        () => UserSearchHistoryTypeOrmEntity,
        (searchHistory) => searchHistory.word
    )
    searchHistory: UserSearchHistoryTypeOrmEntity[];
}
