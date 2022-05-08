const router = require("express").Router()
const { getThoughts } = require("../../controllers/thoughtController");
const thoughtRoutes = require("../../controllers/userController");

router.route("/").get(getThoughts);

module.exports = router