const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const usersController = new UsersController();

const ensureAuth = require("../middlewares/ensureAuthenticated");

usersRoutes.post("/", ensureAuth, usersController.create);

module.exports = usersRoutes;
