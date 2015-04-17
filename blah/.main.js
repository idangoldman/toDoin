'use strict';

var Email = require('./email'),
    Url = require('./url');

module.exports = {
    email: new Email(),
    url: new Url()
};