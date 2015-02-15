var shiftOn = null,

keyMap = {
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

function is(keyName, code) {
    return keyName === ifShiftPressed( keyMap[code] || code );
}

function which(code) {
    return ifShiftPressed(keyMap[code] || code);
}

function ifShiftPressed(code) {
    if (shiftOn) {
        code = [keyMap[32], '+', code].join('');
    }

    shiftOn = code === 'shift';

    return code;
}

module.exports = {
    is: is,
    which: which
};