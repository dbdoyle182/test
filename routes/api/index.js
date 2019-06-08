const router = require("express").Router();
const testRoutes = require("./test");
const userRoutes = require("./user");
const robotRoutes = require("./robot");
const taskRoutes = require("./task");

router.use("/test", testRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/robot", robotRoutes);

module.exports = router;