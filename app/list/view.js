define('ListView', ['underscore', 'backbone', 'ListItemView'], function(_, Backbone, ListItemView) {
    return Backbone.View.extend({
        initialize: function() {
            var that = this;
            this.render();

            this.collection.bind('change', this.render, this);

            this.collection.on('modeSwitch', function(data) {
                that.collection.modeFilter = data;
                that.render();
            });
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
                if (that.collection.modeFilter === 'remain' && !model.get('complete')) {
                    that.$el.find('ul').append(new ListItemView({'model': model}).$el);
                } else if (that.collection.modeFilter === 'complete' && model.get('complete')) {
                    that.$el.find('ul').append(new ListItemView({'model': model}).$el);
                }
            });

            return this;
        }
    });
});