import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

//Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Dishes-API Documentation",
            description: "API REST for Gastronomy purposes",
            version: "1.0.0",
            license: {
                name: "Licensed Under MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "JSONPlaceholder",
                url: "https://jsonplaceholder.typicode.com",
            },
        },
        servers: [
            {
                url: "http://localhost:1234",
                description: "Localhost server",
            },
        ],
    },
    apis: ["./Models/*.js"],
};

//Consumir Documentacion
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
