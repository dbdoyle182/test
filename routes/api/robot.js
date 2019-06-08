const router = require("express").Router();
const robotController = require("../../controllers/robotController");

router.route("/").get(robotController.getRobotById).post(robotController.createRobot).put(robotController.editRobot).delete(robotController.deleteRobot);
router.route("/user").get(robotController.getRobotsByUser);

module.exports = router;