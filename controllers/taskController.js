const utils = require("./utils");
require("dotenv").config();
const uuid = require("uuid/v1");
const AWS = require("aws-sdk");
let awsconfig;
if(process.env.NODE_ENV === "production") {
    awsconfig = {
        region: `us-east-1`,
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
      }
} else {
    awsconfig = {
        region: `us-east-1`,
        endpoint: "http://localhost:8000",
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
      }
}
// Set the region
AWS.config.update(awsconfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

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
  ];

  const levels = [
    {
      level: 1,
      expTo: 50
    },
    {
      level: 2,
      expTo: 150
    },
    {
      level: 3,
      expTo: 450
    },
    {
      level: 4,
      expTo: 1350
    },
    {
      level: 5,
      expTo: 2500
    },
    {
      level: 6,
      expTo: 3650
    },
    {
      level: 7,
      expTo: 5000
    },
    {
      level: 8,
      expTo: 7500
    },
    {
      level: 9,
      expTo: 8500
    },
    {
      level: 10,
      expTo: 10000
    }
];

const taskController = {
    completeTask: (req, res) => {
        const { task, robot } = req.body;
        const nextLevel = levels.filter(level => level.level === robot.level + 1)[0]
        const newExperience = Math.floor(robot.experience + task.exp);
        const newTotal = robot.total ? robot.total + task.time : task.time;
        let newRecords = []
        for (let taskRecord of robot.tasks) {
          if (task.type === taskRecord.description) {
            newRecords.push({
              description: taskRecord.description,
              timespent: taskRecord.timespent + task.time,
              times: taskRecord.times + 1
            })
          } else {
            newRecords.push(taskRecord)
          }
        }
        let UpdateExpression = "set #experience = :newExperience, #total = :newTotal, #tasks = :newTasks";
        let ExpressionAttributeNames = {
            "#experience": "experience",
            "#total": "total",
            "#tasks": "tasks"
        }
        let ExpressionAttributeValues = {
            ":newExperience": newExperience,
            ":newTotal": newTotal,
            ":newTasks": newRecords
        }
        if (newExperience >= nextLevel.expTo) {
            let newLevel = nextLevel.level
            UpdateExpression += ", #level = :newLevel";
            ExpressionAttributeNames["#level"] = "level";
            ExpressionAttributeValues[":newLevel"] = newLevel
        }
        dynamodb.update(
            { 
                TableName: "robots",
                Key: { "robotId": robot.robotId },
                ReturnValues: "ALL_NEW",
                UpdateExpression,
                ExpressionAttributeNames,
                ExpressionAttributeValues
            },
            (err, data) => {
                if (err) {
                    res.status(400).json({ message: "Error!", error: err });
                } else {
                    res.status(200).json({ message: `${robot.name} has completed ${task.type}`, data: data });
                }
            }
        )
    }
}

module.exports = taskController;