const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

exports.SearchBlogPost = async function (key) {

    if (!key) {
        key = '';
    }

    const client = new DynamoDBClient({ region: process.env.Region });
    const command = new ScanCommand({
        TableName: process.env.BlogPostTableName,
        FilterExpression: "begins_with(title, :title)",
        ExpressionAttributeValues: {
            ":title": { S: key.toString() }
        },
        Limit: 10,
        ConsistentRead: false
    });
    const response = await client.send(command);

    return response.Items;

}