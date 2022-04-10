import {EventBridgeEvent} from "aws-lambda";
import {checkShot, checkSource, createNewEvent} from "./utils";

const handler = async (event: EventBridgeEvent<any, any>, _context: any) => {
    // Check if the event is from the correct source
    const expectedSource = "player2";
    checkSource(event, expectedSource)

    // Check if it's a valid shot and create a new event
    const playerNum = "One"
    if (checkShot(playerNum)) {
        const newSource = "player1";
        await createNewEvent(event, newSource)
    }
};

export {handler}