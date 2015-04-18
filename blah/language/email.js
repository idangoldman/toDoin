'use strict';

var Base = require('./base'),
    _ = require('underscore'),

    Email = Base.extend({
        init: function() {
            this.exprOnce = /^(([a-zA-Z\d_\-\+\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z\d_\-\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;
            this.exprMore = /(([a-zA-Z\d_\-\+\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z\d_\-\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*/g;
        }
    });

Email.prototype.html = function(string) {
    var emails = this.match(string);

    if (emails.length) {
        _.each(emails, function(email) {
            var name = '@' + email.split('@')[0],
                emailTag = ['<a href="mailto:', email, '" target="_blank">', name, '</a>'].join('');

            string = string.replace(email, emailTag);
        });
    }

    return string;
};

module.exports = new Email();