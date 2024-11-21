// Importes
import express from "express";
import fs from "fs";
import https from "https";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ensureAuthenticated } from "./Middlewares/ensureAuth.js";
import { crearRouter } from "./Routes/Routes.js";
import { AuthRouter } from "./Routes/Auth.js";
import { miCors } from "./Middlewares/Cors.js";
import { FoodModel } from "./Models/Food.js";
import MongoDB from "./Config/MongoDB.js";

// Certificados SSL
// const PKey = fs.readFileSync("./FoodAPI/HTTPS/key.pem", "utf8");
// const Cer = fs.readFileSync("./FoodAPI/HTTPS/cert.pem", "utf8");
// const credentials = { key: PKey, cert: Cer };

// Configuración de Express
const app = express();
app.use(express.json());
app.use(miCors());

// Conexión a MongoDB
MongoDB();

// Configuración de la sesión
// app.use(
//     session({
//         secret: "secret",
//         resave: false,
//         saveUninitialized: false,
//     })
// );

// Inicialización de Passport
// app.use(passport.initialize());
// app.use(passport.session());

// Configuracion de Passport
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID:
//                 "327386553767-p6rc0mnp09onajq8emfn43kpkmbr4g5m.apps.googleusercontent.com",
//             clientSecret: "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",
//             callbackURL: "https://localhost:1234/auth/google/callback",
//         },
//         function (accessToken, refreshToken, profile, done) {
//             return done(null, profile);
//         }
//     )
// );

// // Serialización del usuario en la sesión
// passport.serializeUser((user, done) => {
//     done(null, user);
// });
// // Deserialización del usuario desde la sesión
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

//Rutas Autentification
// app.use(AuthRouter());

// Rutas principales
app.use(crearRouter({ foodModel: FoodModel }));

//Servidor HTTPS
// const httpsServer = https.createServer(credentials, app);

// Inicialización del servidor
const PORT = process.env.PORT ?? 1234;

// httpsServer.listen(PORT, () => {
//     console.log(`Server is running on port https://localhost:${PORT}`);
// });

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
