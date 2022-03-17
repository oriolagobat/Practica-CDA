import {DynamoDB} from "aws-sdk";

const handler = async (event: any, _context: any) => {
    const client = new DynamoDB.DocumentClient()
    await client.get({
        Key: {
            id: event.id
        },
        TableName: "oriol-agost-dynamodb-table"
    }).promise()
}

export {handler}
