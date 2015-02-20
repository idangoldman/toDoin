var Backbone = require('backbone'),
    Template = require('./template.html');

module.exports = Backbone.View.extend({
    initialize: function() {
        this.model = {
            complete: 0,
            remain: 0
        };

        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'change', this.render);
        this.listenTo(this.collection, 'add', this.render);
    },
    render: function() {
        this.updateStats();

        this.$el
            .empty()
            .append(this.template(this.model));

        return this;
    },
    tagName: 'header',
    template: Template,
    updateStats: function() {
        this.model.complete = this.collection.completeCount;
        this.model.remain = this.collection.remainCount;
    },
});