import {EventBridge} from "aws-sdk";
import {EventBridgeEvent} from "aws-lambda";

const handler = async (event: EventBridgeEvent<any, any>, _context: any) => {
    if (!checkSource(event)) {
        console.log("Error, source was not the expected one")
    }
    let newRound: number = checkAndReturnNewRound(event)
    if (checkShot()) {
        await createNewEvent(newRound);
    }
}

function checkSource(event: any): Boolean {
    let expected = String("player1");
    return expected === event.source;
}

function checkAndReturnNewRound(event: any): number {
    let actualRound = event.detail.round;
    if (isNaN(actualRound)) {
        console.log("Starting game")
        return 1  // "Start" the game, last round will be 10
    }
    console.log("Actual round is " + actualRound)
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

// If the number generated is bigger than seven, continue playing
// Otherwise, stop the game
function checkShot(): Boolean {
    console.log("Checking shot")
    let shot = getRandomInt()
    if (shot > 7) {
        console.log("Player two failed its shot... finishing game.");
        throw new Error("Game has already finished");
    }

    return true
}

// Return a random integer between zero and ten
function getRandomInt(): number {
    const max = 10;
    return Math.floor(Math.random() * Math.floor(max));
}


export {handler}