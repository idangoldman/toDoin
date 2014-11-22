define('HeaderView', ['backbone', 'text!templates/header.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        template: _.template(Template),
        tagName: 'header',
        render: function() {
            this.$el.empty();
            this.$el.html(this.template);

            return this;
        }
    });
});