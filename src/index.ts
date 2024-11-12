import express, { Express } from 'express';
import mutantRoutes from "./routes/mutant.routes";
// import { isMutant } from './controllers/mutant';

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use('/mutant', mutantRoutes)

app.listen(port, () => {
  console.log(`Server is running`);
});