/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { carsRouter } from "./cars/cars.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { authHandler } from "./middleware/auth.middleware";
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/* Swagger files start */
const swaggerFile: string = (process.cwd()+"/src/api/swagger.json");
const swaggerData: string = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
/* Swagger files end */

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

// swagger docs
app.use('/api/docs', swaggerUi.serve,
  swaggerUi.setup(swaggerDocument));

app.use(authHandler);

app.use("/api/cars", carsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
