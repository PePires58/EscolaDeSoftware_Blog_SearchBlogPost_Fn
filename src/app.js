let response;

const dynamodbService = require('./services/dynamodbService');

exports.lambdaHandler = async (event, context) => {
    try {
        const resultDb = await dynamodbService.SearchBlogPost(event.queryStringParameters.value);
        const resultBody = resultDb;

        response = {
            'statusCode': 200,
            'body': JSON.stringify(resultBody),
            'isBase64Encoded': false,
            'headers': {}
        }
    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 500,
            'body': JSON.stringify(err),
            'isBase64Encoded': false,
            'headers': {}
        }
    }

    return response
};