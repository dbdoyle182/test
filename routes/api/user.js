const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/").get(userController.findUser).post(userController.createUser).put(userController.editUser).delete(userController.deleteUser);

module.exports = router;