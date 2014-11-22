define('ListView', ['backbone', 'text!templates/list-item.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();

            this.collection.bind('change', this.render, this);
        },
        template: _.template(Template),
        tagName: 'section',
        attributes: function() {
            return {
                'class': 'list'
            };
        },
        render: function(blah) {
            var elements = [],
                that = this;

            this.$el.empty().append('<ul>');
            this.collection.each(function(model) {
                that.$el.find('ul').append(that.template(model.toJSON()));
            });

            return this;
        }
    });
});