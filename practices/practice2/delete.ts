import {DynamoDB} from "aws-sdk";

const handler = async(event: any, _context: any): Promise<void> => {
    const client = new DynamoDB.DocumentClient()
    await client.delete({
        TableName: 'oriol-agost-dynamodb-table',
        Key: {
            id: event.id
        }
    }).promise()
}
export {handler}