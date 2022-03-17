import {DynamoDB} from "aws-sdk";

const handler = async (event: any, _context: any) => {
    const client = new DynamoDB.DocumentClient()
    let res = await client.get({
        Key: {
            id: event.id
        },
        TableName: "oriol-agost-dynamodb-table"
    }).promise()

    console.log(res)
}

export {handler}
