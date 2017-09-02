const keyMap = {
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


export function down( keyName, event ) {
    // should be written.
}

export function up( keyName, event ) {
    // should be written.
}

export function altShiftPress( event, code ) {
    let pressedKey = [];
    let key = keyMap[ code ] || code;

    if ( event.altKey && key !== 'alt' ) {
        pressedKey.push( keyMap[18] );
    }

    if ( event.shiftKey && key !== 'shift' ) {
        pressedKey.push( keyMap[16] );
    }

    if ( -1 === pressedKey.length && pressedKey.indexOf( key ) ) {
        pressedKey.push( key );
    }

    return pressedKey.join('+');
}

export function is( keyName, event ) {
    let code = event.which || event.keyCode;
    let key = altShiftPress( event, code ) || keyMap[ code ] || code;

    return keyName === key;
}

export function which( event ) {
    var code = event.which || event.keyCode;

    return altShiftPress( event, code ) || keyMap[ code ] || code;
}
