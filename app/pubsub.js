define('PubSub', ['backbone'], function(Backbone) {
    Backbone.pubSub = _.extend({}, Backbone.Events);
});