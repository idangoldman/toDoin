define('ToDoin', ['jquery', 'underscore', 'backbone', 'ListCollection', 'HeaderView', 'ListView', 'AddView'],
    function($, _, Backbone, ListCollection, HeaderView, ListView, AddView) {
        return Backbone.View.extend({
            initialize: function() {
                (this.template || $('body')).prepend(this.render().el);
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