'use strict';

var Base = require('./base'),
    _ = require('underscore'),

    Url = Base.extend({
        init: function() {
            this.expression = "((https?:)?\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?";
        }
    });

Url.prototype.html = function(string) {
    var urls = this.match(string);

    if (urls.length) {
        _.each(urls, function(url) {
            var title = url,
                urlTag = ['<a href="', url, '" class="url">', title, '</a>'].join('');

            string = string.replace(url, urlTag);
        });
    }

    return string;
};

module.exports = Url;