// Importes
import express from "express";
import https from "https";
import session from "express-session";
import passport from "./Config/passport.js";
import { crearRouter } from "./Routes/Routes.js";
import { AuthRouter } from "./Routes/Auth.js";
import { miCors } from "./Middlewares/Cors.js";
import { FoodModel } from "./Models/Food.js";
import MongoDB from "./Config/MongoDB.js";
import swaggerUI from "swagger-ui-express";
import { credentials } from "./Config/credentials.js";
import swaggerDocs from "./Config/swagger.js";

// Configuración de Express
const app = express();
app.use(express.json());
app.use(miCors());

// Conexión a MongoDB
MongoDB();

// Configuración de la sesión
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);

// Inicialización de Passport
// app.use(passport.initialize());
// app.use(passport.session());

//Servidor HTTPS
// const httpsServer = https.createServer(credentials, app);

//Rutas Autentification
app.use(AuthRouter());

// Rutas principales
app.use(crearRouter({ foodModel: FoodModel }));

app.use("/Doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Obtener el objeto de Swagger
app.get("/Spec", (req, res) => {
    res.json(swaggerDocs);
});

// Inicialización del servidor
const PORT = process.env.PORT ?? 1234;

// httpsServer.listen(PORT, () => {
//     console.log(`Server is running on port https://localhost:${PORT}`);
// });

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
