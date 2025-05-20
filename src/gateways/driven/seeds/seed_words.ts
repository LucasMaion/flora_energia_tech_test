import fs from 'fs';
import { AppDataSource } from '../infra/datasources/database';
import { WordTypeOrmEntity } from '../infra/entities/words.entity';
import { DataSeedStatusTypeOrmEntity } from '../infra/entities/data_seed_status';

export async function seedWords(): Promise<void> {
    const seedStatusRepo = AppDataSource.getRepository(DataSeedStatusTypeOrmEntity);
    const seedStatus = await seedStatusRepo.findOne({ where: { name: 'words' } })

    if (seedStatus && seedStatus.isSeeded) {
        console.log('Data already seeded');
        return;
    }
    const repo = AppDataSource.getRepository(WordTypeOrmEntity);
    const data = JSON.parse(fs.readFileSync('./src/gateways/driven/seeds/data/words_dictionary.json', 'utf-8'));

    const keys = Array.from(new Set(Object.keys(data)))
    const chunkSize = 65535;
    const chunks = [];
    for (let i = 0; i < keys.length; i += chunkSize) {
        chunks.push(keys.slice(i, i + chunkSize));
    }
    for (const chunk of chunks) {
        const words = chunk.map((key) => { return { word: key } });
        await repo.insert(words);
    }

    seedStatusRepo.save({
        name: 'words',
        isSeeded: true,
    });
    console.log('Import completed');
};