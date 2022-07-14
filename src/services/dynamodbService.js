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
        Limit: 100,
        ConsistentRead: false,
        ExclusiveStartKey: undefined
    });

    if (inputSearch.lastItem)
        command.input.ExclusiveStartKey = {
            "title": { S: inputSearch.lastItem.title },
            "id": { S: inputSearch.lastItem.id }
        };

    const response = await client.send(command);

    return { Items: response.Items, LastEvaluatedKey: response.LastEvaluatedKey, ScannedCount: response.ScannedCount };
}