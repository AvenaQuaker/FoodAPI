import https from "https";
import { credentials } from "./credentials.js";

export const setupServer = (app, PORT) => {
    //Servidor HTTPS
    // const httpsServer = https.createServer(credentials, app);

    // httpsServer.listen(PORT, () => {
    //     console.log(`Server is running on port https://localhost:${PORT}`);
    // });

    // Servidor HTTP
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
};
