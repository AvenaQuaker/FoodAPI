import express from "express";
import { miCors } from "./Cors.js";
import session from "express-session";

export const setupMiddlewares = (app) => {
    app.use(express.json());
    app.use(miCors());
    app.use(
        session({
            secret: "secret",
            resave: false,
            saveUninitialized: false,
        })
    );
};
