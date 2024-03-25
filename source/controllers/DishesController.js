const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
  async create(request, response) {
    const { title, description, category, price, ingredients } = request.body;

    const checkDishAlreadyExists = await knex("dishes")
      .where({ title })
      .first();

    if (checkDishAlreadyExists) {
      throw new AppError("Este prato já existe no cardápio.");
    }

    const imageFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imageFileName);

    const dish_id = await knex("dishes").insert({
      image: filename,
      title,
      description,
      price,
      category,
    });

    const hasOnlyOneIngredient = typeof ingredients === "string";

    let ingredientsInsert;

    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        dish_id,
      };
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map((name) => {
        return {
          name,
          dish_id,
        };
      });
    }

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  }
}

module.exports = DishesController;
