const Task = require("./Task.js");



class Queue {
    constructor(robot) {
        this.tasks = [];
    }

    enqueue(task) {
        console.log(task)
        this.tasks.push(task);
        return this.tasks
    }

    dequeue() {
        return this.tasks.pop();
    }

    remove(uuid) {
        this.tasks = this.tasks.filter(task => task.uuid !== uuid);
        return this.tasks;
    }
    
    isEmpty() {
        return this.tasks.length === 0;
    }

    first() {
        return this.tasks[0]
    }

    last() {
        return this.tasks[this.tasks.length - 1]
    }

    length() {
        return this.tasks.length;
    }
};


module.exports =  Queue;