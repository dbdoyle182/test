require("dotenv").config();
const uuid = require("uuid/v1");
const AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  region: `us-east-1`,
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const utils = {
    addRobotToUser: (username, robot, callback) => {
        const { robotId } = robot;
        console.log("Username", username);
        console.log("Robot", robot)
        dynamodb.update(
        {
            TableName: "robot-users",
            Key: { username },
            ReturnValues: "ALL_NEW",
            UpdateExpression:
            "set #robots = list_append(if_not_exists(#robots, :empty_list), :robot)",
            ExpressionAttributeNames: {
            "#robots": "robots"
            },
            ExpressionAttributeValues: {
            ":robot": [robotId],
            ":empty_list": []
            }
        },
        (err, data) => {
            if (err) {
                callback({ message: "Error!", error: err });
            } else {
                callback({ message: "Robot added to user!", data: data });
            }
        }
        );
    },
    addTaskToQueue: (task, robot, callback) => {
        console.log("Task", task);
        console.log("Robot", robot);
        task["number"] = uuid();
        dynamodb.update(
            {
                TableName: "robots",
                Key: { "robotId": robot.robotId },
                ReturnValues: "ALL_NEW",
                UpdateExpression:
                "set #taskQueue = list_append(if_not_exists(#taskQueue, :empty_list), :task)",
                ExpressionAttributeNames: {
                "#taskQueue": "taskQueue",
                },
                ExpressionAttributeValues: {
                ":task": [task],
                ":empty_list": []
                }
            },
            (err, data) => {
                if (err) {
                    callback({ message: "Error!", error: err });
                } else {
                    callback({ message: "Task loaded into queue!", data: data });
                }
            }
        )
    },
    removeTaskFromQueue: (task, robot, callback) => {
        console.log("Task", task);
        console.log("Robot", robot);
        const newQueue = robot.taskQueue.filter(taskInQueue => taskInQueue.number !== task.number)
        dynamodb.update(
            { 
                TableName: "robots",
                Key: { "robotId": robot.robotId },
                ReturnValues: "ALL_NEW",
                UpdateExpression:
                "set #taskQueue = newQueue",
                ExpressionAttributeNames: {
                "#taskQueue": "taskQueue",
                },
                ExpressionAttributeValues: {
                ":newQueue": newQueue
                }
            },
            (err, data) => {
                if (err) {
                    callback({ message: "Error!", error: err });
                } else {
                    callback({ message: "Task loaded into queue!", data: data });
                }
            }
        )
    }
}

module.exports = utils