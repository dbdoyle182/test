require("dotenv").config();
const uuid = require("uuid/v1");
const utils = require("./utils")
const AWS = require("aws-sdk");
// Set the region
AWS.config.update(utils.awsconfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const errorHandle = (err, res) => {
    console.log(err);
    res.status(400).json(err);
};

const successHandle = (data, res, resultObj) => {
    console.log(data);
    if (resultObj) {
        res.status(200).json(resultObj)
    } else {
        res.status(200).json(data)
    }
}
const robotController = {
    createRobot: (req, res) => {
        const { name, type, owner } = req.body;
        /*
        {
            name
            type
        }
        */
       console.log(req.body); 
       const params = {
           TableName: 'robots',
           Item: {
                robotId: uuid(),
                name,
                type,
                owner,
                level: 0,
                experience: 0,
                taskQueue: []
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
          console.log(params)
                    
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
          console.log(params)
                    
        dynamodb.scan(params, function(err, data) {
            if (err) {
                errorHandle(err, res)
            } else {
                successHandle(data.Items, res)
            }
        });
    },
    editRobot: (req, res) => {
        
    },
    deleteRobot: (req, res) => {

    }
}

module.exports = robotController;