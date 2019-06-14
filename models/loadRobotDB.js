const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  accessKeyId: "something",
  secretAccessKey: "somethingelse"
});
const dynamodb = new AWS.DynamoDB();

let dummyUsers = [
    {
        name: "Joe Smith",
        username: "robotman123",
        phoneNumber: "8881112222",
        robots: []
    },
    {
        name: "Jane Doe",
        username: "robotmaam123",
        phoneNumber: "8456542542",
        robots: []
    },
    {
        name: "wild",
        username: "wild",
        phoneNumber: "12345657890",
        robots: []
    }
]

const params = {
    RequestItems: {
        "robot-users": dummyUsers.map(user => {
            return {
                PutRequest: {
                    Item: {
                        "name": {
                            S: user.name
                        },
                        username: {
                            S: user.username
                        },
                        phoneNumber: {
                            S: user.phoneNumber
                        },
                        robots: {
                            L: user.robots
                        }
                    }
                }
            }
        })
    }
};

dynamodb.batchWriteItem(params, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})