import express from 'express';
import routes from './routes';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./src/docs/swagger.yml');


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;