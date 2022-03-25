import {DynamoDB} from "aws-sdk";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

const handler = async (event: any, _context: any) : Promise<DocumentClient.AttributeMap | undefined> =>  {
    const client = new DynamoDB.DocumentClient()
    let res = await client.get({
        Key: {
            id: event.id
        },
        TableName: "oriol-agost-dynamodb-table"
    }).promise()

    return(res.Item)
}

export {handler}
