import mongoose from "mongoose";

const setupMongoDB = async () => {
    try {
        const uri =
            "mongodb+srv://Jaime:sonic123%40@clustermongo.ial5c.mongodb.net/API-REST?retryWrites=true&w=majority&appName=ClusterMONGO";

        const clientOptions = {
            serverApi: { version: "1", strict: true, deprecationErrors: true },
        };

        await mongoose.connect(uri, clientOptions);
        console.log("Conexión exitosa con MongoDB");
    } catch (err) {
        console.error("Error al conectar con MongoDB: ", err);
        process.exit(1);
    }
};

export default setupMongoDB;
