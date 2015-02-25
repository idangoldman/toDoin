'use strict';

var base = require('./base');

var expression = new RegExp(/^[a-zA-Z]*$/, 'g'),
    word = new base(expression);

module.exports = word;