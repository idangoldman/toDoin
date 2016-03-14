'use strict';

var Class = require('class.extend'),

    BadgeCounter = Class.extend({
        init: function() {
            chrome.browserAction.setBadgeText({text: ''});
            chrome.browserAction.setBadgeBackgroundColor({color: '#9E9E9E'});

            this.counter = 0;
        },
        plusOne: function() {
            this.counter += 1;
            this.setCount(this.counter);
        },
        setCount: function(number) {
            this.counter = parseInt(number, 10) || 0;

            chrome.browserAction.setBadgeText({
                text: this.getCountNumber()
            });
        },
        getCountNumber: function() {
            return this.counter ? this.counter.toString() : '';
        }
    });

module.exports = new BadgeCounter();