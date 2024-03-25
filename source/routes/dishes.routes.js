const { Router } = require("express");

const DishesController = require("../controllers/DishesController");

const dishesController = new DishesController();

const dishesRoutes = Router();

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.put("/:id", upload.single("image"), dishesController.update);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;
