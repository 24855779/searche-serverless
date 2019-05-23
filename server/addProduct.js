'use strict';

console.log('Loading function');

var aws = require('aws-sdk');

var docClient = new aws.DynamoDB.DocumentClient();

aws.config.region = 'us-east-1';

exports.handler = function(event, context, callback) {
    let { pid, name, price } = event.queryStringParameters;

    if (!pid || pid == null || pid == '') {
        callback(null, {
            statusCode: 200,
            body: 'pid无效',
        });
        return;
    }
    if (!name || name == null || name == '') {
        callback(null, {
            statusCode: 200,
            body: 'name无效',
        });
        return;
    }
    if (!price || price == null || price == '') {
        callback(null, {
            statusCode: 200,
            body: 'price无效',
        });
        return;
    }
    price = Number(price);
    pid = Number(pid);

    var params = {
        Item: {
            date: Date.now(),
            name,
            pid,
            price,
        },
        TableName: 'product'
    };

    docClient.put(params, function(err) {
        if (err != null) {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ message: '插入数据错误', err }),
            });
            return;
        }
        callback(null, {
            statusCode: 200,
            body: '数据添加成功',
        });
    });

};