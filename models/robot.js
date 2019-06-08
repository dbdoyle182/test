class Robot {
    constructor (name, type) {
        this.name = name;
        this.type = type
    }

    completeTask = (task) => {
        const taskArray = [
            {
              description: 'do the dishes',
              eta: 1000,
            },{
              description: 'sweep the house',
              eta: 3000,
            },{
              description: 'do the laundry',
              eta: 10000,
            },{
              description: 'take out the recycling',
              eta: 4000,
            },{
              description: 'make a sammich',
              eta: 7000,
            },{
              description: 'mow the lawn',
              eta: 20000,
            },{
              description: 'rake the leaves',
              eta: 18000,
            },{
              description: 'give the dog a bath',
              eta: 14500,
            },{
              description: 'bake some cookies',
              eta: 8000,
            },{
              description: 'wash the car',
              eta: 20000,
            },
          ]
    }

    robotStats = (type) => {
        return {
            name: this.name,
            type: this.type
        }
    }
}

module.exports = Robot;