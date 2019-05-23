const aws = require('aws-sdk');
const db = new aws.DynamoDB.DocumentClient();

function jsonTo(status, message, data) {
    return JSON.stringify({
        status,
        message,
        data,
    });
}


exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: jsonTo(false, 'keyword参数无效'),
        });
        return;
    }
    let { keyword } = event.queryStringParameters;

    if (!keyword || keyword == null || keyword == '') {
        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: jsonTo(false, 'keyword参数无效'),
        });
        return;
    }

    let params = {
        TableName: 'product',
        //Limit: 10,
        FilterExpression: " contains(#n, :k)",
        ExpressionAttributeNames: {
            "#n": "name",
        },
        ExpressionAttributeValues: {
            ":k": keyword,
        },
    };

    db.scan(params, (err, result) => {
        if (err != null) {
            callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: jsonTo(false, err.message),
            })
            return;
        }
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: jsonTo(true, "success", result),
        };

        callback(null, response);
    });

};