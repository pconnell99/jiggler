var robot = require("robotjs");

// Speed up the mouse.
robot.setMouseDelay(2);

const MOVESPANINMILLIS = 3800;
const WAITSPANINMILLIS = 28000;

let automateInterval;
let autoPos = robot.getMousePos();

function automate() {
    "use strict";
    automateInterval = setInterval(() => {
        let currentPos = robot.getMousePos();
        // console.log("Interval Triggered");
        // console.log(currentPos, autoPos);
        if (currentPos.x === autoPos.x && currentPos.y === autoPos.y) {
            let newx = Math.round(getRandomArbitrary(currentPos.x - 10, currentPos.x + 10));
            let newy = Math.round(getRandomArbitrary(currentPos.y - 10, currentPos.y + 10));
            //console.log("Moving to", newx, newy);
            robot.moveMouseSmooth(newx, newy);
            autoPos = robot.getMousePos();
        } else {
            // console.log(currentPos);
            // console.log("Movement - pausing");
            autoPos = robot.getMousePos();
            pause();
        }
    }, MOVESPANINMILLIS);
}

function pause() {
    "use strict";
    //console.log("Pausing");
    clearInterval(automateInterval);
    setTimeout(() => {
        //console.log("Retrying");
        automate();
    }, WAITSPANINMILLIS);
}

function getRandomArbitrary(min, max) {
    "use strict";
    return Math.random() * (max - min) + min;
}

// Start process until closed.
automate();