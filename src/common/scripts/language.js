import { textDirection } from 'common/scripts/direction';

const URL_REGEX = /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/gm;
const EMAIL_REGEX = /(([a-zA-Z\d_\-\+\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z\d_\-\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*/gm;
const DATE_REGEX = /[0-9]{1,4}[\/]{1}[0-9]{1,2}[\/]{1}[0-9]{1,4}/gm;
// const NUMBER_REGEX = /\d/gm;

export const REGEX_TYPES = [ 'email', 'url', 'date' ];

String.prototype.phrase = function() {
    let say = {
        'original': this,
        'copy': this,
        'params': {}
    };

    REGEX_TYPES.map( type => {
        if ( say.copy[ 'have' + type.capitalize() ]() ) {
            let regex = new RegExp();
            let replaceIndex = 0;

            switch( type ) {
                case 'email':
                    regex = EMAIL_REGEX;
                break;

                case 'url':
                    regex = URL_REGEX;
                break;

                case 'date':
                    regex = DATE_REGEX;
                break;
            }

            say['copy'] = say.copy.replace( regex, match => {
                let typeIndex = type + '_' + replaceIndex;
                say['params'][ typeIndex ] = match;
                replaceIndex = replaceIndex.counter();
                return `{ ${typeIndex} }`;
            });
        }
    });

    return say;
};

String.prototype.paraphrase = function() {
    let say = chrome.i18n.getMessage( this.replace().split(' ').join('_') );
    let notFound = '# phraseNotFound #';

    return say.trim().length ? say : notFound;
};

// String.prototype.haveNumber = function() {
//     return NUMER_REGEX.test( this );
// };

String.prototype.haveEmail = function() {
    return EMAIL_REGEX.test( this );
};

String.prototype.haveUrl = function() {
    return URL_REGEX.test( this );
};

String.prototype.haveDate = function () {
    return DATE_REGEX.test( this );
};

String.prototype.capitalize = function() {
    return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
}

String.prototype.pad = function() {
    return 10 > this.toNumber() ? '0' + this : this;
}

String.prototype.toNumber = function () {
    return parseFloat( this );
};

String.prototype.clean = function() {
    return this
        .replace( /<(.*?)>/gm, '' )
        .replace( '&nbsp;', '' )
        .replace( /\s\s+/gm, ' ' )
        .trim();
};

String.prototype.textDirection = function() {
    return textDirection( this );
}

Number.prototype.counter = function( number = 1 ) {
    return this + number;
}
