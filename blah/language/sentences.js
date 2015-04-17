'use strict';

// ([a-zA-Z0-9()'"@#$%&+\-=,]\s?(\w\.\w)*?)+      Sentence
// ([a-zA-Z0-9()'"@#$%&+\-=]\s?)+       parts of sentence
// ([a-zA-Z0-9()'"@#$%&+\-=]\S?(\w\.\w)*?)+      words?

var _ = require('underscore');

function sentence(string) {
    var type = '',
        parts = [],
        children = [],
        lastCharacter = string.slice(-1);

    switch (lastCharacter) {
        case '?':
            type = 'interrogative';
            break;
        case '!':
            type = 'exclamatory';
            break;
        default:
            type = 'declarative-imperative';
            break;
    }

    // split for parts
    parts = string.split(', ');
    if (parts.length > 1) {
        parts[parts.length - 1] = parts[parts.length - 1].slice(0, -1);
    } else {
        parts = null;
    }

    return {
        'name': 'sentence',
        'type': type,
        'text': string,
        'parts': parts
    };
}

function sentences(string) {
    var items = string.match(/([a-zA-Z0-9()'"@#$%&+\-=,]\s?(\w\.\w)*?)+/g),
        output = [];

    if (items.length) {
        _.each(items, function(item) {
            output.push(sentence(item));
        });
    }

    return output.length ? output : string;
};

module.exports = sentences;