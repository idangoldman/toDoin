define('ListView', ['underscore', 'backbone', 'ListItemView', 'text!templates/list.html'], function(_, Backbone, ListItemView, Template) {
    return Backbone.View.extend({
        initialize: function() {
            var that = this;

            // this.collection.bind('change', this.render, this);

            // this.collection.on('switchView', function(data) {
            //     that.collection.modeFilter = data;
            //     that.render();
            // });
        },
        tagName: 'section',
        template: _.template(Template),
        attributes: function() {
            return {
                'class': 'tasks'
            };
        },
        render: function(collection) {
            var that = this;

            this.$el.empty().append(this.template);

            _.each(collection, function(model) {
                that.$el.find('ul').append(new ListItemView({'model': model}).$el);
            });

            return this;
        }
    });
});