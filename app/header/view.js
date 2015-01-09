define('HeaderView', ['underscore', 'backbone', 'Router', 'text!templates/header.html'], function(_, Backbone, Router, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.model = {
                complete: 0,
                remain: 0
            };

            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'add', this.render);
        },
        template: _.template(Template),
        tagName: 'header',
        updateStats: function() {
            this.model.complete = this.collection.completeCount;
            this.model.remain = this.collection.remainCount;
        },
        render: function() {
            this.updateStats();

            this.$el
                .empty()
                .append(this.template(this.model));

            return this;
        }
    });
});