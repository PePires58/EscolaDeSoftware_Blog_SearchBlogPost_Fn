let response;

const dynamodbService = require('./services/dynamodbService');

exports.lambdaHandler = async (event, context) => {
    try {
        const inputSearch = {
            value: event.queryStringParameters.value,
            lastItem: event.headers && event.headers["lastItem"] ? event.headers["lastItem"] : undefined
        }
        const resultDb = await dynamodbService.SearchBlogPost(inputSearch);

        const resultDbArray = resultDb.Items.map((item) => {
            return {
                Id: item.id.S,
                Title: item.title.S,
                Category: item.category.S,
                Image_principal_key: item.image_principal_key.S,
                Post_date: item.post_date.S,
                Resume: item.resume.S
            }
        });

        const resultBody = {
            Items: resultDbArray,
            ScannedCount: resultDb.ScannedCount,
            LastEvaluatedKey: resultDb.LastEvaluatedKey
        }

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