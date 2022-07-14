let response;

const dynamodbService = require('./services/dynamodbService');

exports.lambdaHandler = async (event, context) => {
    try {
        const resultDb = await dynamodbService.SearchBlogPost(event.queryStringParameters.value);

        const resultBody = resultDb.map((item) => {
            return {
                Id: item.id.S,
                Title: item.title.S,
                Category: item.category.S,
                Image_principal_key: item.image_principal_key.S,
                Post_date: item.post_date.S,
                Resume: item.resume.S
            }
        });

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