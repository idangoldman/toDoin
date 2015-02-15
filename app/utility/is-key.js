var shift = null;

function isKey(keyName, code) {
    var result = null;

    switch(code) {
        case 27:
            result = 'esc';
        break;
        case 13:
            result = 'enter';
        break;
    }

    return keyName === result || false;
}

module.exports = isKey;