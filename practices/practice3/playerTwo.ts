import {EventBridgeEvent} from "aws-lambda";
import {checkAndReturnNewRound, checkShot, checkSource, createNewEvent} from "./utils";

const handler = async (event: EventBridgeEvent<any, any>, _context: any) => {
    // Check if the event is from the correct source
    const expectedSource = "player1";
    checkSource(event, expectedSource)

    // Check if it's last round, and get new round
    let newRound = checkAndReturnNewRound(event);

    // Check if it's a valid shot and create a new event
    const playerNum = "Two"  // Needed for the console.log
    if (checkShot(playerNum)) {
        const newSource = "player2";
        await createNewEvent(newSource, newRound);
    }
}

export {handler}