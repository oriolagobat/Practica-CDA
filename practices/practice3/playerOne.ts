import {EventBridge} from "aws-sdk";

const handler = async (event: any, _context: any) => {
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
    let start = String("start")
    let actualRound = event.detail.round;
    if (actualRound === start) {
        console.log("Starting game")
        return 0  // "Start" the game
    }
    console.log("Actual round is" + actualRound)
    return manageStartedGame(actualRound);
}

function manageStartedGame(actualRound: number): number {
    let lastRound = 9;
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