const aws = require('aws-sdk');
const db = new aws.DynamoDB.DocumentClient();

function jsonTo(status, message, data) {
    return JSON.stringify({
        status,
        message,
        data,
    });
}

const pageSize = 100;

exports.handler = (event, context, callback) => {
    let params = {
        TableName: 'product',
        Limit: pageSize,
    };
    db.scan(params, (err, data) => {
        if (err != null) {
            callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: jsonTo(false, err.message),
            });
            return;
        }
        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: jsonTo(true, "success", data)
        });
    });

};