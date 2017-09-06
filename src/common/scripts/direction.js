const charactersMap = {
    arabic: "\u0600-\u06FF",
    hebrew: "\u0590-\u05FF",
};


function checkChar( char ) {
    return char.match(
        new RegExp('[' + [ charactersMap.arabic, charactersMap.hebrew ].join('|') + ']' )
    );
}

function firstChar( text ) {
    return text[0] || '';
}


export function textDirection( text ) {
    return isRTL( text ) ? 'rtl' : 'ltr';
}

export function isLTR( text ) {
    return ! checkChar( firstChar( text ) );
}

export function isRTL( text ) {
    return !! checkChar( firstChar( text ) );
}
