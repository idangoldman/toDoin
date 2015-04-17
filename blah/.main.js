'use strict';

var Email = require('./email'),
    Url = require('./url');

module.exports = {
    email: Email,
    url: Url,
    html: function(string) {
        if (string.length) {
            string = this.email.html(string);
            string = this.url.html(string);
        }

        return string;
    }
};