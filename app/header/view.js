define('HeaderView', ['backbone', 'text!templates/header.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.template = _.template(Template);
            // this.model = window.firstData.layout;

            this.render(this.template, this.model);
        },
        render: function(template, model) {
            this.$el.empty();
            this.$el.html(template(model));

            return this;
        }
    });
});