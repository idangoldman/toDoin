var charactersMap = {
    arabic: "\u0600-\u06FF",
    hebrew: "\u0590-\u05FF",
};


function checkChar(char) {
    return char.match(new RegExp('[' + [charactersMap['arabic'], charactersMap['hebrew']].join('|') + ']'));
}

function is(text) {
    return isRTL(text) ? 'rtl' : 'ltr';
}

function isLTR(text) {
    var firstChar = text[0] || '',
        result = checkChar(firstChar);

    return !result;
}

function isRTL(text) {
    var firstChar = text[0] || '',
        result = checkChar(firstChar);

    return !!result;
}

module.exports = {
    is: is,
    isLTR: isLTR,
    isRTL: isRTL
};