import dotenv from 'dotenv';
import app from './gateways/driver/api_rest/server';
import { AppDataSource } from './gateways/driven/infra/datasources/database';
import { seedWords } from './gateways/driven/seeds/seed_words';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

(async () => {
    try {
        await AppDataSource.initialize();
        await seedWords();

        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}.`);
        });
    } catch (error) {
        console.error("Error initializing app:", error);
        process.exit(1);
    }
})();