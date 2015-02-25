'use strict';

var base = require('./base'),
    _ = require('underscore');

var expression = /^(([a-zA-Z\d_\-\+\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z\d_\-\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/g,
    email = _.extend(new base(expression));

email.prototype.html = function(string) {
    var emails = this.match(string);

    if (emails.length) {
        _.each(emails, function(email) {
            string.replace(email, '<a href="mailto:'+ email +'" class="email">'+ name +'</a>');
        });
    }

    return string;
};

module.exports = email;