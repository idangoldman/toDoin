define('ListItemView', ['backbone', 'text!templates/list-item.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        template: _.template(Template),
        tagName: 'li',
        render: function() {
            this.$el.empty();
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
});