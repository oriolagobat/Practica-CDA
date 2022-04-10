import {EventBridge} from "aws-sdk";
import {EventBridgeEvent} from "aws-lambda";
import {checkAndReturnNewRound, checkShot} from "./utils";

const handler = async (event: EventBridgeEvent<any, any>, _context: any) => {
    if (!checkSource(event)) {
        console.log("Error, source was not the expected one")
    }
    let newRound: number = checkAndReturnNewRound(event)
    if (checkShot("Two")) {
        await createNewEvent(newRound);
    }
}

function checkSource(event: any): Boolean {
    let expected = String("player1");
    return expected === event.source;
}

function createNewEvent(newRound: number) {
    const eventBridge = new EventBridge();
    const detail = {round: newRound}
    const params = {
        Entries: [
            {
                Detail: JSON.stringify(detail),
                DetailType: "ping-pong-event",
                EventBusName: 'oriol-agost-event-bridge',
                Source: 'player2',
            },
        ]
    };
    return eventBridge.putEvents(params).promise();
}


export {handler}