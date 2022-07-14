const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

exports.SearchBlogPost = async function (key) {

    if (!key) {
        key = '';
    }

    const client = new DynamoDBClient({ region: process.env.Region });
    const command = new QueryCommand({
        TableName: process.env.BlogPostTableName,
        KeyConditionExpression: "BEGINS_WITH(title, :title)",
        ExpressionAttributeValues: {
            ":title": { S: key.toString() }
        },
        Limit: 10
    });
    const response = await client.send(command);

    return response.Items;

}