define('ListView', ['backbone', 'ListItemView'], function(Backbone, ListItemView) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();

            this.collection.bind('change', this.render, this);
        },
        tagName: 'section',
        attributes: function() {
            return {
                'class': 'list'
            };
        },
        render: function() {
            var elements = [],
                that = this;

            this.$el.empty().append('<ul>');
            this.collection.each(function(model) {
                that.$el.find('ul').append(new ListItemView({'model': model}).$el);
            });

            return this;
        }
    });
});