const router = require("express").Router();
const { getUsers } = require("../../controllers/userController");
const userRoutes = require("../../controllers/userController");

router.route("/").get(getUsers);
