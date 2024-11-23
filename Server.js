// Importes
import express from "express";
import passport from "./Config/passport.js";
import setupMongoDB from "./Config/MongoDB.js";
import { FoodModel } from "./Models/Food.js";
import { setupSwagger } from "./Config/swaggerSetup.js";
import { setupMiddlewares } from "./Middlewares/Setup.js";
import { setupRutas } from "./Routes/Setup.js";
import { setupServer } from "./Config/serverSetup.js";

// Configuración de Express
const app = express();

// Middlewares
setupMiddlewares(app);

// Conexión a MongoDB
setupMongoDB();

// Configuración de Passport
// app.use(passport.initialize());
// app.use(passport.session());

//Rutas
setupRutas(app, { foodModel: FoodModel });

// Inicializacion de Swagger
setupSwagger(app);

// Inicializacion del Servidor
const PORT = process.env.PORT ?? 1234;
setupServer(app, PORT);
