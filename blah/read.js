'use strict';

var Sentences = require('./language/sentences');

module.exports = function(string) {
    var write = null;

    if (string.length) {
        write = Sentences(string);
    }

    return write;
};