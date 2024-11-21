import { validateFood, validatePartialFood } from "../Schemas/FoodSchema.js";

export class FoodController {
    constructor({ foodModel }) {
        this.foodModel = foodModel;
    }

    Home = async (req, res) => {
        res.status(200).json({ Message: "Bienvenido a la API de Comidas" });
    };

    GetAll = async (req, res) => {
        const dishes = await this.foodModel.getFoods();
        res.status(200).json(dishes);
    };

    GetFood = async (req, res) => {
        try {
            const { key } = req.params;
            const result = await this.foodModel.getFood(key);

            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(404).json(result);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    };

    CreateFood = async (req, res) => {
        try {
            const result = validateFood(req.body);

            if (!result.error) {
                const dish = await this.foodModel.createFood({
                    food: req.body,
                });
                res.status(201).json(dish);
            } else {
                res.status(400).json(result.error);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    };

    UpdateFood = async (req, res) => {
        try {
            const result = await this.foodModel.updateFood({ food: req.body });

            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(404).json(result);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    };

    DeleteFood = async (req, res) => {
        try {
            const { key } = req.params;
            const result = await this.foodModel.deleteFood(key);

            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(404).json(result);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    };
}
