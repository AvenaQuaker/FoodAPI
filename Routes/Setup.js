import { crearRouter } from "./Routes.js";
import { AuthRouter } from "./Auth.js";

export const setupRutas = (app, Model) => {
    // Rutas de Autentificacion
    app.use(AuthRouter());

    // Rutas Principales
    app.use(crearRouter(Model));
};
