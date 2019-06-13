require("dotenv").config();
const uuid = require("uuid/v1");
const utils = require("./utils")
const AWS = require("aws-sdk");
// Set the region
AWS.config.update(utils.awsconfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const errorHandle = (err, res) => {
    res.status(400).json(err);
};

const successHandle = (data, res, resultObj) => {
    if (resultObj) {
        res.status(200).json(resultObj)
    } else {
        res.status(200).json(data)
    }
}
const robotController = {
    createRobot: (req, res) => {
        const { name, type, owner } = req.body;
        let user = owner
        if (owner === undefined) {
            user = "wild"
        }
       const params = {
           TableName: 'robots',
           Item: {
                robotId: uuid(),
                name,
                type,
                owner: user,
                level: 0,
                experience: 0,
                tasks: [
                        {   
                            description: 'do the dishes',
                            timespent: 0,
                            times: 0
                        },
                        {
                            description: 'sweep the house',
                            timespent: 0,
                            times: 0
                        },
                        {
                            description: 'do the laundry',
                            timespent: 0,
                            times: 0
                        },
                        {
                            description: 'take out the recycling',
                            timespent: 0,
                            times: 0
                        },
                        {
                            description: 'make a sammich',
                            timespent: 0,
                            times: 0
                        },
                        {
                            description: 'mow the lawn',
                            timespent: 0,
                            times: 0
                        },
                        {
                            description: 'rake the leaves',
                            timespent: 0,
                            times: 0
                        },
                        {
                            description: 'give the dog a bath',
                            timespent: 0,
                            times: 0
                        },
                        {
                            description: 'bake some cookies',
                            timespent: 0,
                            times: 0
                        },
                        {
                            description: 'wash the car',
                            timespent: 0,
                            times: 0
                        }
                    ]
                
            }
          };
       dynamodb.put(params, (err, data) => {
           if (err) {
               errorHandle(err, res);
           } else {
               utils.addRobotToUser(owner, params.Item, (resultObj) => successHandle(data, res, resultObj))
           }
       })
    }, 
    getRobotById: (req, res) => {
        const { robotId } = req.query;

        var params = {
            TableName : 'robots',
            FilterExpression : 'robotId = :robotId',
            ExpressionAttributeValues : {':robotId' : robotId }
          };
                    
        dynamodb.scan(params, function(err, data) {
            if (err) {
                errorHandle(err, res)
            } else {
                successHandle(data.Items[0], res)
            }
        });
    },
    getRobotsByUser: (req, res) => {
        const { owner } = req.query;

        var params = {
            TableName : 'robots',
            FilterExpression : '#owner = :owner',
            ExpressionAttributeValues: {':owner' : owner },
            ExpressionAttributeNames: { '#owner' : 'owner' }
          };
                    
        dynamodb.scan(params, function(err, data) {
            if (err) {
                errorHandle(err, res)
            } else {
                successHandle(data.Items, res)
            }
        });
    },
    getAllRobots: (req, res) => {
        const params = {
            TableName : "robots"
        }


        
        dynamodb.scan(params, function(err, data) {
            if (err) { 
                errorHandle(err, res)
            } else {
                console.log(data.Items)
                let sortedRobots = data.Items.sort((a, b) => {
                    console.log("A", a.experience)
                    console.log("B", b.experience)
                    console.log(parseInt(b.experience) - parseInt(a.experience))
                    return parseInt(b.experience) - parseInt(a.experience) * -1
                });      

                console.log(sortedRobots)
                successHandle(sortedRobots, res)
            }
        })
    },
    editRobot: (req, res) => {
        
    },
    deleteRobot: (req, res) => {
        const { robot, user } = req.body;
        const params = {
            TableName: "robots",
            Key: {
                robotId: robot.robotId
            }
        }
        let newRobots = user.robots.filter(oldRobot => {
            console.log("old robot id", oldRobot);
            console.log(robot.robotId)
            return oldRobot !== robot.robotId
        });
        const userParams = {
            TableName: "robot-users",
            Key: { username: robot.owner },
            UpdateExpression: "set #robots = :robots",
            ExpressionAttributeNames: {
                "#robots": "robots"
            },
            ExpressionAttributeValues: {
                ":robots": newRobots
            }
        }

        dynamodb.delete(params, (err, data) => {
            if (err) {
                res.status(400).json(err)
            } else {
                dynamodb.update(userParams, (err, data) => {
                    if (err) {
                        res.status(400).json({ error: err, url: req.url, body: req.body });
                    } else {
                        res.status(200).json({
                            success: "delete call succeed!",
                            url: req.url,
                            data: data
                        });
                    }
                })
            }
        })
    }
}

module.exports = robotController;