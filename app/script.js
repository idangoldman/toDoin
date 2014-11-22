define('ToDoin', ['jquery', 'underscore', 'backbone', 'Router', 'ListCollection', 'HeaderView', 'ListView', 'AddView'],
    function($, _, Backbone, Router, ListCollection, HeaderView, ListView, AddView) {
        return Backbone.View.extend({
            initialize: function() {
                $('body').prepend(this.render().el);
            },
            attributes: function() {
                return {
                    'id': 'ToDoin'
                };
            },
            render: function() {
                var elements = [],
                    that = this;

                ListCollection.fetch({reset:true});

                elements.push(new HeaderView());
                elements.push(new ListView({collection: ListCollection}));
                elements.push(new AddView({collection: ListCollection}));

                that.$el.empty();

                _.each(elements, function(element) {
                    that.$el.append(element.$el);
                });

                return that;
            }
        });
    }
);