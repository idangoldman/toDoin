define('ToDoin', ['jquery', 'underscore', 'backbone', 'HeaderView', 'ListView', 'AddView'], function($, _, Backbone, Header, List, Add) {
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
                var elements = [Header, List, Add],
                    that = this;

                that.$el.empty();

                _.each(elements, function(element) {
                    that.$el.append(( new element() ).$el.html());
                });

                return that;
            }
        });
    }
);