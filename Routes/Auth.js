import express from "express";
import passport from "../Config/passport.js";
import { ensureAuthenticated } from "../Middlewares/ensureAuth.js";

export const AuthRouter = () => {
    const router = express.Router();

    // Rutas de autenticación
    router.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    // Ruta para el callback de Google, después de la autenticación
    router.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: "/" }),
        function (req, res) {
            res.redirect("/");
        }
    );

    // Ruta protegida (perfil del usuario)
    router.get("/profile", ensureAuthenticated, (req, res) => {
        res.send(
            `<h1>Perfil del Usuario</h1><p>${JSON.stringify(req.user)}</p>`
        );
    });

    // Ruta para cerrar sesión
    router.get("/logout", (req, res) => {
        req.logout((err) => {
            if (err) {
                console.error("Error al cerrar sesión:", err);
            }
            res.redirect("/");
        });
    });

    return router;
};
