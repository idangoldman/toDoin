var keyMap = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    20: 'capslock-on',
    27: 'esc',
    32: 'space',
    91: 'cmd-right',
    93: 'cmd-left'
};


function down(keyName, event) {
    // should be written.
}

function altShiftPress(event, code) {
    var pressedKey = [],
        key = keyMap[code] || code;

    if (event.altKey && key !== 'alt') {
        pressedKey.push(keyMap[18]);
    }

    if (event.shiftKey && key !== 'shift') {
        pressedKey.push(keyMap[16]);
    }

    if (pressedKey.length && pressedKey.indexOf(key) === -1) {
        pressedKey.push(key);
    }

    return pressedKey.join('+');
}

function is(keyName, event) {
    var code = event.which || event.keyCode,
        key = altShiftPress(event, code) || keyMap[code] || code;

    return keyName === key;
}

function up(keyName, event) {
    // should be written.
}

function which(event) {
    var code = event.which || event.keyCode;

    return altShiftPress(event, code) || keyMap[code] || code;
}

module.exports = {
    down: down,
    is: is,
    up: up,
    which: which
};