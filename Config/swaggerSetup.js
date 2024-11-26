import swaggerUI from "swagger-ui-express";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import swaggerDocs from "./swaggerDocs.js";

const theme = new SwaggerTheme();
const customCss = `
    ${theme.getBuffer(SwaggerThemeNameEnum.DARK)} /* CSS del tema */
    .swagger-ui .topbar { 
        background: url('https://images.vexels.com/media/users/3/174637/raw/1be5034ca8fa356870993e5ac567ae37-diseno-de-banner-de-comida-italiana.jpg') no-repeat center/cover;
        height: 200px;
    }
    .swagger-ui .topbar .topbar-wrapper {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }`;

const options = {
    explorer: false,
    customCss,
    customSiteTitle: "Dishes-API Documentation",
};

export const setupSwagger = (app) => {
    app.use("/Doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));

    app.get("/Spec", (req, res) => {
        res.json(swaggerDocs);
    });
};
