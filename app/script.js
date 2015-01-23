var Backbone = require('backbone'),
    Router = require('./router');

Backbone.pubSub = _.extend({}, Backbone.Events);
new Router();