const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
});
const dynamodb = new AWS.DynamoDB();


const robotParams = {
    TableName: "robots"
}

const userParams = {
    TableName: "robot-users"
}

const tableArray = [robotParams, userParams]

tableArray.forEach(params => {
    dynamodb.deleteTable(params, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
})