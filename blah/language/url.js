'use strict';

var Base = require('./base'),
    _ = require('underscore'),

    Url = Base.extend({
        init: function() {
            this.exprOnce = /^https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*$/;
            this.exprMore = /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/g;
        }
    });

Url.prototype.html = function(string) {
    var urls = this.match(string);

    if (urls.length) {
        _.each(urls, function(rawUrl) {
            var url =  rawUrl.indexOf('www.') === 0 ? 'http://' + rawUrl : rawUrl,
                title = url.replace(/((https?):\/\/)?(www\.)?/, ''),
                urlTag = ['<a href="', url, '" target="_blank">', title, '</a>'].join('');

            string = string.replace(rawUrl, urlTag);
        });
    }

    return string;
};

module.exports = new Url();