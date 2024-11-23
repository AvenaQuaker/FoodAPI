import swaggerUI from "swagger-ui-express";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import swaggerDocs from "./swaggerDocs.js";

const theme = new SwaggerTheme();
const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
};

export const setupSwagger = (app) => {
    app.use("/Doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));

    app.get("/Spec", (req, res) => {
        res.json(swaggerDocs);
    });
};
