import Dish from "../Models/Dishes.js";

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: API para gestionar los platillos.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Dish:
 *       type: object
 *       properties:
 *         Key:
 *           type: integer
 *           description: Clave única del platillo.
 *         Nombre:
 *           type: string
 *           description: Nombre del platillo.
 *         Origen:
 *           type: string
 *           description: Origen del platillo.
 *         Ingredientes:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de ingredientes del platillo.
 *         Imagen:
 *           type: string
 *           description: URL de la imagen del platillo.
 */

export class FoodModel {
    /**
     * @swagger
     * /Foods:
     *   get:
     *     summary: Obtiene todos los platillos.
     *     tags: [Foods]
     *     responses:
     *       200:
     *         description: Lista de todos los platillos.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Dish'
     */
    static async getFoods() {
        try {
            const dishes = await Dish.find();
            return dishes;
        } catch (err) {
            return { message: err.message };
        }
    }

    /**
     * @swagger
     * /Foods/{key}:
     *   get:
     *     summary: Obtiene un platillo por su clave.
     *     tags: [Foods]
     *     parameters:
     *       - in: path
     *         name: key
     *         required: true
     *         schema:
     *           type: integer
     *         description: Clave del platillo.
     *     responses:
     *       200:
     *         description: Detalles del platillo.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Dish'
     *       404:
     *         description: Platillo no encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                   example: "No se ha encontrado nada"
     */
    static async getFood(Key) {
        const dish = await Dish.find({ Key: Key });

        if (dish.length === 0) {
            return {
                success: false,
                message: "No se ha encontrado nada",
            };
        } else {
            return { success: true, Dish: dish };
        }
    }

    /**
     * @swagger
     * /Foods:
     *   post:
     *     summary: Crea un nuevo platillo.
     *     tags: [Foods]
     *     requestBody:
     *       description: Datos del nuevo platillo.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               Nombre:
     *                 type: string
     *                 description: Nombre del platillo.
     *               Origen:
     *                 type: string
     *                 description: Origen del platillo.
     *               Ingredientes:
     *                 type: array
     *                 items:
     *                   type: string
     *                 description: Lista de ingredientes del platillo.
     *               Imagen:
     *                 type: string
     *                 description: URL de la imagen del platillo.
     *     responses:
     *       201:
     *         description: Platillo creado exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Dish'
     */
    static async createFood({ food }) {
        const dishes = await Dish.find();
        const KeyINT = dishes[dishes.length - 1].Key + 1;

        const dish = {
            Key: KeyINT,
            Nombre: food.Nombre,
            Origen: food.Origen,
            Ingredientes: food.Ingredientes,
            Imagen: food.Imagen,
        };

        const result = await Dish.insertMany(dish);
        return dish;
    }

    /**
     * @swagger
     * /Foods:
     *   patch:
     *     summary: Actualiza un platillo existente.
     *     tags: [Foods]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Dish'
     *     responses:
     *       200:
     *         description: Platillo actualizado exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Dish'
     *       404:
     *         description: Platillo no encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                   example: "No se ha encontrado el platillo deseado."
     */
    static async updateFood({ food }) {
        const oldDish = await Dish.find({ Key: food.Key });

        const dish = {
            Nombre: food.Nombre,
            Origen: food.Origen,
            Ingredientes: food.Ingredientes,
            Imagen: food.Imagen,
        };

        if (oldDish.length === 0) {
            return {
                success: false,
                message: "No se ha encontrado el platillo deseado",
            };
        } else {
            const result = await Dish.updateOne(
                { Key: food.Key },
                { $set: dish }
            );
            return { success: true, Dish: dish };
        }
    }

    /**
     * @swagger
     * /Foods/{key}:
     *   delete:
     *     summary: Elimina un platillo por su clave.
     *     tags: [Foods]
     *     parameters:
     *       - in: path
     *         name: key
     *         required: true
     *         schema:
     *           type: integer
     *         description: Clave del platillo a eliminar.
     *     responses:
     *       200:
     *         description: Platillo eliminado exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Dish'
     *       404:
     *         description: Platillo no encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                   example: "No se ha encontrado el platillo deseado."
     */
    static async deleteFood(Key) {
        const dish = await Dish.find({ Key: Key });

        if (dish.length === 0) {
            return {
                success: false,
                message: "No se ha encontrado el platillo deseado",
            };
        } else {
            const result = await Dish.deleteOne({ Key: Key });
            return { success: true, Dish: dish };
        }
    }
}
