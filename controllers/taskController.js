const utils = require("./utils");

const taskArray = [
    {
      description: 'do the dishes',
      eta: 1000,
      exp: 3
    },{
      description: 'sweep the house',
      eta: 3000,
      exp: 10
    },{
      description: 'do the laundry',
      eta: 10000,
      exp: 15
    },{
      description: 'take out the recycling',
      eta: 4000,
      exp: 5
    },{
      description: 'make a sammich',
      eta: 7000,
      exp: 12
    },{
      description: 'mow the lawn',
      eta: 20000,
      exp: 20
    },{
      description: 'rake the leaves',
      eta: 18000,
      exp: 18
    },{
      description: 'give the dog a bath',
      eta: 14500,
      exp: 14
    },{
      description: 'bake some cookies',
      eta: 8000,
      exp: 8
    },{
      description: 'wash the car',
      eta: 20000,
      exp: 20
    },
  ]

const taskCompletion = (taskObj, robot) => {
    const { description } = taskObj;
    const { name } = robot;
    return `${name} has completed task ${description}`
}

const taskController = {
    completeTask: (req, res) => {
        const { task, robot } = req.body;
        if (JSON.parse(robot).taskQueue.length >= 5) {
          res.json({ message: "Uh oh, don't want to over work your robot! Wait till they finish some other tasks."})
          return
        }
        console.log(JSON.parse(robot))
        const taskAtHand = taskArray.filter(taskObj => taskObj.description.includes(task))[0];
        const taskFunction = (result) => {
          console.log(result)
          setTimeout(() => {
              res.json({
                message: taskCompletion(taskAtHand, JSON.parse(robot))
              })
        }, taskAtHand.eta)
        }

        res.status(200)
        utils.addTaskToQueue(taskAtHand, JSON.parse(robot), taskFunction)
        
    }
}

module.exports = taskController;