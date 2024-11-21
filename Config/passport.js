import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Configuracion de Passport
passport.use(
    new GoogleStrategy(
        {
            clientID:
                "327386553767-p6rc0mnp09onajq8emfn43kpkmbr4g5m.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "https://localhost:1234/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

// Serialización del usuario
passport.serializeUser((user, done) => {
    done(null, user);
});
// Deserialización del usuario
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

export default passport;
