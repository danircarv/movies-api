const { Router } = require("express");

const usersRouter = require("./users.routes.js");
const dishesRouter = require("./dishes.routes.js");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);

module.exports = routes;
