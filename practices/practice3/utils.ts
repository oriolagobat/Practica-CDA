// Checks if current round we're starting the game and return 1
// Otherwise, call function to return the new round
export function checkAndReturnNewRound(event: any): number {
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


// If the number generated is bigger than seven, continue playing
// Otherwise, stop the game
export function checkShot(player: String): Boolean {
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
