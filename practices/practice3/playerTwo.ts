import {EventBridgeEvent} from "aws-lambda";
import {checkShot, checkSource, createNewEvent} from "./utils";

const handler = async (event: EventBridgeEvent<any, any>, _context: any) => {
    // Check if the event is from the correct source
    const expectedSource = "player1";
    checkSource(event, expectedSource)

    // Check if it's a valid shot and create a new event
    if (checkShot("Two")) {
        const newSource = "player2";
        await createNewEvent(event, newSource);
    }
}

export {handler}