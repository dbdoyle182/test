const uuid = require("uuid/v1");
const taskUtils = require("../utils/taskApi");

class Task {
    constructor(type, time) {
        this.id = uuid();
        this.type = type;
        this.time = time;
        this.exp = (time / 1000) + Math.floor(Math.random() * 9);

        this.endTask = this.endTask.bind(this);
        this.addExperience = this.addExperience.bind(this);
    }

    addExperience() {
        taskUtils.endTask({type: this.type, time: this.time, exp: this.exp}, this.robot).then(response => {
            return response
        }).catch(err => {
            console.log(err)
        })
    }

    endTask() {
        return this.addExperience()
    }

}

module.exports = Task;