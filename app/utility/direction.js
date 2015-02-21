var charactersMap = {
    arabic: "\u0600-\u06FF",
    hebrew: "\u0590-\u05FF",
};


function checkChar(char) {
    return char.match(new RegExp('[' + [charactersMap.arabic, charactersMap.hebrew].join('|') + ']'));
}

function firstChar(text) {
    return text[0] || '';
}

function is(text) {
    return isRTL(text) ? 'rtl' : 'ltr';
}

function isLTR(text) {
    return !checkChar(firstChar(text));
}

function isRTL(text) {
    return !!checkChar(firstChar(text));
}

module.exports = {
    is: is,
    isLTR: isLTR,
    isRTL: isRTL
};