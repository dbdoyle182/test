require("dotenv").config();
const AWS = require("aws-sdk");
const { awsconfig } = require("./utils");
// Set the region
AWS.config.update(awsconfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const errorHandle = (err, res) => {
    console.log(err);
    res.status(400).json(err);
};

const successHandle = (data, res) => {
    console.log(data);
    res.status(200).json(data)
}
const userController = {
    createUser: (req, res) => {
        /*
        {
            username
            name
            phoneNumber
        }
        */
        console.log(req.body); 
        const params = {
            TableName: 'robot-users',
            Item: {
             ...req.body,
             robots: []
            }
           };
        dynamodb.put(params, (err, data) => {
            if (err) {
                errorHandle(err, res);
            } else {
                successHandle(data, res);
            }
        })
    },
    findUser: (req, res) => {
        const { username } = req.query;
        const params = {
            TableName : 'robot-users',
            Key: {
              username
            }
          };
          
          console.log(params)
          
          dynamodb.get(params, function(err, data) {
            if (err) {
                errorHandle(err, res)
            } else {
                successHandle(data, res)
            }
          });
    },

    findAllUsers: (req, res) => {
        const params = {
            TableName: "robot-users"
        };

        dynamodb.scan(params, (err, data) => {
            if (err) {
                errorHandle(err, res)
            } else {
                
            }
        })
    },
    editUser: (req, res) => {
        const { username, data } = req.body;
        let ExpressionAttributeValues = {};
        let UpdateExpression = "set";
        let ExpressionAttributeNames = {};
        for (let i in data) {
            UpdateExpression += ` #${i} = :${i},`;
            ExpressionAttributeValues[`:${i}`] = data[i];
            ExpressionAttributeNames[`#${i}`] = `${i}`;
        }

        UpdateExpression = UpdateExpression.slice(0, -1);

        console.log({
            TableName: "robot-users",
            Key: { username: username },
            ReturnValues: "ALL_OLD",
            UpdateExpression: UpdateExpression,
            ExpressionAttributeNames: ExpressionAttributeNames,
            ExpressionAttributeValues: ExpressionAttributeValues
        })

        dynamodb.update(
            {
                TableName: "robot-users",
                Key: { username: username },
                ReturnValues: "ALL_NEW",
                UpdateExpression: UpdateExpression,
                ExpressionAttributeNames: ExpressionAttributeNames,
                ExpressionAttributeValues: ExpressionAttributeValues
            },
        (err, data) => {
            if (err) {
                console.log(err);
                res.json({ error: err, url: req.url, body: req.body });
            } else {
                res.json({ success: "put call succeed!", url: req.url, data: data });
            }
        }
        );
    },
    deleteUser: (req, res) => {

    }
}

module.exports = userController;