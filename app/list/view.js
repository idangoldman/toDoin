define('ListView', ['underscore', 'backbone', 'ListItemView', 'text!templates/list.html'], function(_, Backbone, ListItemView, Template) {
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
        template: _.template(Template),
        attributes: function() {
            return {
                'class': 'tasks'
            };
        },
        render: function() {
            var elements = [],
                that = this;

            this.$el.empty().append(this.template);
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