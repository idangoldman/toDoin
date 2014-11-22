define('HeaderView', ['backbone', 'text!templates/header.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.model = {
                complete: 0,
                remain: 0,
                all: 0
            };

            this.render();
        },
        template: _.template(Template),
        tagName: 'header',
        render: function() {

            if (this.collection.length) {
                this.model.complete = this.collection.complete().length;
                this.model.remain = this.collection.remain().length;
                this.model.all = this.collection.length;
            }

            this.$el.empty();
            this.$el.html(this.template(this.model));

            return this;
        }
    });
});