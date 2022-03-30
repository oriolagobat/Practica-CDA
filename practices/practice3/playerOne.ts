import {EventBridge} from "aws-sdk";
import {EventBridgeEvent} from "aws-lambda";

const handler = async (event: EventBridgeEvent<any, any>, _context: any) => {
    if (!checkSource(event)) {
        console.log("Error, source was not the expected one")
    }
    let newRound: number = checkAndReturnNewRound(event)
    createNewEvent(newRound)
}

function checkSource(event: any): Boolean {
    let expected = String("player2");
    return expected === event.source;
}

function checkAndReturnNewRound(event: any): number {
    let actualRound = event.detail.round;
    if (isNaN(actualRound)) {
        console.log("Starting game")
        return 1  // "Start" the game, last round will be 10
    }
    console.log("Actual round is" + actualRound)
    return manageStartedGame(actualRound);
}

function manageStartedGame(actualRound: number): number {
    let lastRound = 10;
    if (actualRound == lastRound) {
        throw new Error("Game has already finished");
    }
    return actualRound + 1;
}

function createNewEvent(newRound: number) {
    const eventBridge = new EventBridge();
    const detail = {round: newRound.toString()}
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
    eventBridge.putEvents(params);
}

export {handler}