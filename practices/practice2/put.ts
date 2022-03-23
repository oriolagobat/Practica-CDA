import {DynamoDB} from "aws-sdk";

const handler = async (event: any, _context: any): Promise<void> => {
    const client = new DynamoDB.DocumentClient()
    await client.put({  // Callback, per l'await i el .promise() d'ultima línia fa que s'hagi de executar de una.
        Item: {
            // Els ... abans de event.data fa que  fa que desempaqueti tuples i les entri.
            id: event.id, ...event.data
        },
        TableName: "oriol-agost-dynamodb-table"
    }).promise()
}

export {handler}