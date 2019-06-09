const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
});
const dynamodb = new AWS.DynamoDB();
const robotParams = {
    TableName : "robots",
    KeySchema: [
        { AttributeName: "robotId", KeyType: "HASH"},  //Partition key
],
    AttributeDefinitions: [
        { AttributeName: "robotId", AttributeType: "S" },
],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

const userParams = {
    TableName : "robot-users",
    KeySchema: [
        { AttributeName: "username", KeyType: "HASH"},  //Partition key
],
    AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" },
],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

const params = [robotParams, userParams];
params.forEach(param => {
    dynamodb.createTable(param, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
})
