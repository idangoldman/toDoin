define('ToDoin', ['jquery', 'underscore', 'backbone', 'ListCollection', 'HeaderView', 'ListView', 'AddView'],
    function($, _, Backbone, ListCollection, HeaderView, ListView, AddView) {
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
                    that = this,
                    newListCollection = new ListCollection();

                    elements.push(new HeaderView());
                    elements.push(new ListView({collection: newListCollection}));
                    elements.push(new AddView({collection: newListCollection}));

                that.$el.empty();

                _.each(elements, function(element) {
                    that.$el.append(element.$el);
                });

                return that;
            }
        });
    }
);