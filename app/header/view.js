var Backbone = require('backbone'),
    Template = require('./template.html'),
    Utility = require('../utility/.main');


module.exports = Backbone.View.extend({
    events: {
        'click .sort-by .complete': 'sortBy',
        'click .sort-by .date': 'sortBy',
    },
    initialize: function() {
        this.model = {
            complete: 0,
            remain: 0,
            version: '1.5.3'
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
    sortBy: function(event) {
        var eventType = 'sortby:' + event.currentTarget.className;
    },
    updateStats: function() {
        this.model.complete = this.collection.completeCount;
        this.model.remain = this.collection.remainCount;
    }
});