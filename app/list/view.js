define('ListView', ['backbone', 'text!templates/list.html', 'text!templates/list-item.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        template: _.template(Template),
        tagName: 'ul',
        attributes: function() {
            return {
                'class': 'list'
            };
        },
        render: function() {
            this.$el.empty();
            // this.$el.html(this.template());

            return this;
        }
    });
});