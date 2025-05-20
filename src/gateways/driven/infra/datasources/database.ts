import "reflect-metadata"
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ override: true });

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: process.env.ENVIRONMENT == "prod" ? false : true,
    logging: false,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: ['src/gateways/driven/infra/entities/*.ts'],
    migrations: ['src/gateways/driven/infra/migrations/*.ts'],
});
