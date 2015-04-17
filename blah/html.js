'use strict';

var Email = require('./language/email'),
    Url = require('./language/url');

module.exports = function(string) {
    if (string.length) {
        string = Email.html(string);
        string = Url.html(string);
    }

    return string;
};