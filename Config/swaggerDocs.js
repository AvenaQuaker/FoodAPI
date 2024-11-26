import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

//Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Dishes-API Documentation",
            description: `Esta API está diseñada para gestionar información sobre platillos. Permite crear, obtener, actualizar y eliminar platillos en una base de datos.
                \nLink del Repositorio: https://github.com/AvenaQuaker/FoodAPI`,
            version: "1.0.0",
        },
        components: {},
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
