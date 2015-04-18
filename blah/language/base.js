'use strict';

var Class = require('class.extend'),

    Base = Class.extend({
        init: function() {
            this.expression = null;
        }
    });

Base.prototype.is = function(string) {
    var regex = new RegExp(this.exprOnce);

    return regex.test(string);
};

Base.prototype.match = function(string) {
    var regex = new RegExp(this.exprMore);

    return string.match(regex) || [];
};

module.exports = Base;