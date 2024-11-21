import Dish from "../Models/Dishes.js";

export class FoodModel {
    static async getFoods() {
        try {
            const dishes = await Dish.find();
            return dishes;
        } catch (err) {
            return { message: err.message };
        }
    }

    static async getFood(Key) {
        const dish = await Dish.find({ Key: Key });

        if (dish.length === 0) {
            return {
                success: false,
                message: "No he se ha encontrado nada",
            };
        } else {
            return { success: true, Dish: dish };
        }
    }

    static async createFood({ food }) {
        const dishes = await Dish.find();
        const KeyINT = dishes.length + 1;

        const dish = {
            Key: KeyINT,
            Nombre: food.Nombre,
            Origen: food.Origen,
            Ingredientes: food.Ingredientes,
            Imagen: food.Imagen,
        };

        const result = await Dish.insertMany(dish);
        return { Dish: dish, resultado: result };
    }

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
            return { success: true, newDish: dish, resultado: result };
        }
    }

    static async deleteFood(Key) {
        const dish = await Dish.find({ Key: Key });

        if (dish.length === 0) {
            return {
                success: false,
                message: "No se ha encontrado el platillo deseado",
            };
        } else {
            const result = await Dish.deleteOne({ Key: Key });
            return { success: true, Dish: dish, resultado: result };
        }
    }
}
