'use strict';

// ([a-zA-Z0-9()'"@#$%&+\-=,]\s?(\w\.\w)*?)+      Sentence
// ([a-zA-Z0-9()'"@#$%&+\-=]\s?)+       parts of sentence
// ([a-zA-Z0-9()'"@#$%&+\-=]\S?(\w\.\w)*?)+      words?

var Base = require('./base'),
    _ = require('underscore'),

    Sentences = Base.extend({
        init: function() {
            this.exprOnce = /^[a-zA-Z]$/;
            this.exprMore = /[a-zA-Z]/g;
        }
    });

Sentences.prototype.info = function(string) {
    var items = string.match(/([a-zA-Z0-9()'"@#$%&+\-=,]\s?(\w\.\w)*?)+/g),
        output = [];

    if (items.length) {
        _.each(items, function(item) {
            output.push(sentence(item));
        });
    }

    return output.length ? output : string;
};

module.exports = new Sentences();

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