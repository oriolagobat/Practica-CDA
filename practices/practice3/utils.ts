import {EventBridge} from "aws-sdk";
import {EventBridgeEvent} from "aws-lambda";

// Returns true if the event source is equal to the expected one, both given as parameters.
export function checkSource(event: EventBridgeEvent<any, any>, expected: string) {
    if (expected !== event.source) {
        console.log("Expected source: " + expected + " but got: " + event.source);
        throw Error("Error, source was not the expected one")
    }
}


// Checks if current round we're starting the game and return 1
// Otherwise, call function to return the new round
export function checkAndReturnNewRound(event: EventBridgeEvent<any, any>): number {
    let actualRound = event.detail.round;
    if (isNaN(actualRound)) {
        console.log("Starting game")
        return 1  // "Start" the game, last round will be 10
    }
    console.log("Actual round is " + actualRound)
    return manageStartedGame(actualRound);
}

// If we're already on round 10, finish the game
// Otherwise, return the new round (current round + 1)
function manageStartedGame(actualRound: number): number {
    let lastRound = 10;
    if (actualRound == lastRound) {
        console.log("10 rounds have been played... finishing game.")
    }
    return actualRound + 1;
}


// Generate a number. If it's bigger than seven, continue playing
// Otherwise, stop the game
export function checkShot(player: string): boolean {
    console.log("Checking shot")
    let shot = getRandomInt()
    if (shot > 7) {
        console.log("Player " + player + " failed its shot... finishing game.");
        return false;
    }
    return true
}

// Return a random integer between zero and ten
function getRandomInt(): number {
    const max = 10;
    return Math.floor(Math.random() * Math.floor(max));
}


export function createNewEvent(source: string, round: number) {
    const eventBridge = new EventBridge();

    const detail = {round: round};

    const params = {
        Entries: [
            {
                Detail: JSON.stringify(detail),
                DetailType: "ping-pong-event",
                EventBusName: 'oriol-agost-event-bridge',
                Source: source,
            },
        ]
    }

    console.log("Creating new event")
    return eventBridge.putEvents(params).promise();
}