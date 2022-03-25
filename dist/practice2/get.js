"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const handler = async (event, _context) => {
    const client = new aws_sdk_1.DynamoDB.DocumentClient();
    let res = await client.get({
        Key: {
            id: event.id
        },
        TableName: "oriol-agost-dynamodb-table"
    }).promise();
    return (res.Item);
};
exports.handler = handler;
//# sourceMappingURL=get.js.map