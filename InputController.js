var keyboard = {};

var inputMouseKey0 = false;
var inputMouseKeyDown0 = false;
var inputMouseKey1 = false;
var inputMouseKeyDown1 = false;
var inputMouseKey2 = false;
var inputMouseKeyDown2 = false;
var inputMouseX = 0;
var inputMouseY = 0;
var inputMouseWheel = 0;
var inputPoint = new THREE.Vector2(0, 0);

var startX, startY;

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

function MouseDown(event) {
    if (event.buttons == 1) {
        inputMouseKey0 = true;
        inputMouseKeyDown0 = true;
        startX = event.clientX;
        startY = event.clientY;
    }
    if (event.buttons == 2) {
        inputMouseKey1 = true;
        inputMouseKeyDown1 = true;
    }
    if (event.buttons == 4) {
        inputMouseKey2 = true;
        inputMouseKeyDown2 = true;
        startX = event.clientX;
        startY = event.clientY;
        inputPoint = new THREE.Vector2(startX, startY);
    }
}

function MouseUp(event) {
    if (event.buttons == 0) {
        inputMouseKey0 = false;
        inputMouseKeyDown0 = false;
        inputMouseKey1 = false;
        inputMouseKeyDown1 = false;
        inputMouseKey2 = false;
        inputMouseKeyDown2 = false;
        inputMouseX = 0;
        inputMouseY = 0;
    }
}

function MouseMove(event) {
    if (inputMouseKey0) {
        let endX = event.clientX;
        let endY = event.clientY;
        var x = endX - startX;
        var y = endY - startY;
        inputMouseX = x;
        inputMouseY = y;
        startX = endX;
        startY = endY;
    }
}
var moveWheel = true,
    stopWheel = false,
    wheelClock;

function MouseWheel(event) {
    if (moveWheel == true) {
        inputMouseWheel = event.wheelDelta;
        moveWheel = false;
        stopWheel = true;
        wheelClock = setTimeout(StopWheel, 300);
    } else {
        clearTimeout(wheelClock);
        wheelClock = setTimeout(StopWheel, 250);
    }
}

function StopWheel() {
    if (stopWheel == true) {
        moveWheel = true;
        stopWheel = false;
        inputMouseWheel = 0;
    }
}

function DoubleClick(event) {
    //console.log("双击");
    startX = event.clientX;
    startY = event.clientY;
    inputPoint = new THREE.Vector2(startX, startY);
    Raycast();
}

function Click() {
    //console.log('单击');
}
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
window.addEventListener('mousedown', MouseDown);
window.addEventListener('mouseup', MouseUp);
window.addEventListener('mousemove', MouseMove);
window.addEventListener('mousewheel', MouseWheel);
window.addEventListener('dblclick', DoubleClick);
window.addEventListener('click', Click);