import { GenericEntity } from "./generic.entity";
import { Column, Entity, Index } from "typeorm";

@Index("data_seed_status_pkey", ["id"], { unique: true })
@Entity("data_seed_status", { schema: "public" })
export class DataSeedStatusTypeOrmEntity extends GenericEntity {
    @Column("text", { name: "name", nullable: false, unique: true, default: false })
    name: string;

    @Column("bool", { name: "is_seeded", nullable: false, unique: true, default: false })
    isSeeded: boolean;

}
