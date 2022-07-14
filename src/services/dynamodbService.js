const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

exports.SearchBlogPost = async function (inputSearch) {

    if (!inputSearch.value) {
        inputSearch.value = '';
    }
    if (!inputSearch.lastItem) {
        inputSearch.lastItem = undefined;
    }

    const client = new DynamoDBClient({ region: process.env.Region });
    const command = new ScanCommand({
        TableName: process.env.BlogPostTableName,
        FilterExpression: "begins_with(title, :title)",
        ExpressionAttributeValues: {
            ":title": { S: inputSearch.value.toString() }
        },
        Limit: 10,
        ConsistentRead: false,
        ExclusiveStartKey: undefined
    });

    if (inputSearch.lastItem)
        command.input.ExclusiveStartKey = {
            "title": { S: inputSearch.lastItem }
        };

    const response = await client.send(command);

    return { Items: response.Items, ScannedCount: response.ScannedCount };

}