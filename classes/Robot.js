const Queue = require("./Queue");
const Task = require("./Task");

class Robot {
    constructor ({ robotId, experience, name, type, level}) {
        this.robotId = robotId;
        this.name = name; 
        this.type = type;
        this.experience = experience;
        this.level = level;
        this.taskQueue = new Queue();

        this.robot = this.robot.bind(this);
        this.createTask = this.createTask.bind(this);
        this.startTask = this.startTask.bind(this);
    }

    robot() {
        return {
            name: this.name,
            type: this.type,
            experience: this.experience,
            level: this.level,
            robotId: this.robotId
        }
    }

    createTask(task, time) {
        return new Task(task, time)
        
    }

    startTask(task) {
        if (this.taskQueue.length() >= 5) {
            return "Too many tasks in the queue";
        }
        return this.taskQueue.enqueue(task);
        console.log("Task Queue from Robot.js", this.taskQueue.tasks)
    }
}

module.exports = Robot;