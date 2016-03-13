var _ = require('underscore'),
    Backbone = require('backbone'),
    pubSub = _.extend({}, Backbone.Events);

module.exports = pubSub;