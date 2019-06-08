require("dotenv").config();
const AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  region: `us-east-1`,
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});
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
    editUser: (req, res) => {

    },
    deleteUser: (req, res) => {

    }
}

module.exports = userController;