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
        accessKeyId: "something",
        secretAccessKey: "somethingelse"
      }
}
// Set the region
AWS.config.update(awsconfig);

const dynamodb = new AWS.DynamoDB.DocumentClient();

const utils = {
    awsconfig: awsconfig,
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
        
    },
    removeTaskFromQueue: (task, robot, res) => {
        
    }
}

module.exports = utils