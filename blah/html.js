'use strict';

var Email = require('./helpers/email'),
    Url = require('./helpers/url');

module.exports = function(string) {
    if (string.length) {
        string = Email.html(string);
        string = Url.html(string);
    }

    return string;
};