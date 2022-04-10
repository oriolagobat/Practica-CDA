import AWS from "aws-sdk";
import {EventBridgeEvent} from "aws-lambda";
import "./utils";
import {checkAndReturnNewRound, checkShot, checkSource} from "./utils";

const handler = async (event: EventBridgeEvent<any, any>, _context: any) => {
    const expectedSource = "player2";
    checkSource(event, expectedSource)

    let newRound: number = checkAndReturnNewRound(event)
    if (checkShot("One")) {
        await createNewEvent(newRound)
    }
};

function createNewEvent(newRound: number) {
    const eventBridge = new AWS.EventBridge();
    const detail = {round: newRound}
    const params = {
        Entries: [
            {
                Detail: JSON.stringify(detail),
                DetailType: "ping-pong-event",
                EventBusName: 'oriol-agost-event-bridge',
                Source: 'player1',
            },
        ]
    };
    console.log(params)
    return eventBridge.putEvents(params).promise();
}

export {handler}