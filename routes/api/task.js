const router = require("express").Router();
const taskController = require("../../controllers/taskController");

router.route("/").post(taskController.completeTask);

module.exports = router;