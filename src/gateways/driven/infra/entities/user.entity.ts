import { FavoriteTypeOrmEntity } from "./favorite.entity";
import { GenericEntity } from "./generic.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { UserSearchHistoryTypeOrmEntity } from "./user_search_history.entity";

@Index("user_pkey", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class UserTypeOrmEntity extends GenericEntity {
    @Column("text", { name: "email", nullable: false, unique: true })
    email: string;

    @Column("text", { name: "password", nullable: false })
    password: string;

    @Column("text", { name: "name", nullable: false, unique: true })
    name: string;

    @OneToMany(
        () => FavoriteTypeOrmEntity,
        (favorite) => favorite.user
    )
    favorites: FavoriteTypeOrmEntity[];

    @OneToMany(
        () => UserSearchHistoryTypeOrmEntity,
        (searchHistory) => searchHistory.user
    )
    searchHistory: UserSearchHistoryTypeOrmEntity[];
}
