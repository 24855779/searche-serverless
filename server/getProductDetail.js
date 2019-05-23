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
            body: jsonTo(false, "参数错误"),
        });
        return;
    }
    let { pid } = event.queryStringParameters;
    if (!pid || pid == null || pid == '') {
        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: jsonTo(false, "pid无效"),
        });
        return;
    }

    pid = Number(pid);
    if (Number.isNaN(pid) || pid < 1) {
        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: jsonTo(false, "pid无效"),
        });
        return;
    }
    let options = {
        TableName: 'product',
        Key: {
            "pid": pid,
        },
    };

    db.get(options, (err, data) => {
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
            body: jsonTo(true, "success", data),
        });
    });
};