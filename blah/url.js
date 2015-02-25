'use strict';

var base = require('./base');

var expression = new RegExp(/^((https?:)?\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/, 'g'),
    url = new base(expression);

module.exports = url;