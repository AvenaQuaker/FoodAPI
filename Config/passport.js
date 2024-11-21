import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Serialización del usuario
passport.serializeUser((user, done) => {
    done(null, user);
});
// Deserialización del usuario
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Configuración de Google OAuth 2.0
passport.use(
    new GoogleStrategy(
        {
            clientID:
                "327386553767-p6rc0mnp09onajq8emfn43kpkmbr4g5m.apps.googleusercontent.com", // Mover las credenciales a variables de entorno
            clientSecret: "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",
            callbackURL: "http://localhost:1234/auth/google",
        },
        (accessToken, refreshToken, profile, done) => {
            // Aquí puedes manejar el acceso al perfil del usuario
            return done(null, profile);
        }
    )
);

export default passport;
