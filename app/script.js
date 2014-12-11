define('ToDoin', ['jquery', 'underscore', 'backbone', 'Router', 'ListCollection', 'HeaderView', 'ListView', 'AddView'],
    function($, _, Backbone, Router, ListCollection, HeaderView, ListView, AddView) {
        return Backbone.View.extend({
            initialize: function() {
                $('body').prepend(this.render().el);

                var router = new Router();
            },
            attributes: function() {
                return {
                    'id': 'ToDoin'
                };
            },
            render: function() {
                var elements = [HeaderView, ListView, AddView],
                    that = this;

                ListCollection.fetch({reset:true});

                that.$el.empty();
                _.each(elements, function(element) {
                    that.$el.append((new element({collection: ListCollection})).$el);
                });

                return that;
            }
        });
    }
);

require(['ToDoin'], function(ToDoin) {
    window.todoin = new ToDoin();
});