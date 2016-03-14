var _ = require('underscore'),
    Backbone = require('backbone'),
    Utility = require('common/utility/.main');

module.exports = Backbone.View.extend({
    tagName: 'button',
    attributes: {
        'type': 'button',
    },
    className: 'clean-button',
    events: {
        'click': 'cleanCompleteModels'
    },
    initialize: function() {
        this.render();
        this.listenTo(this.collection, 'change:complete', this.render);
        Utility.vent.on('typing:adjust-height', this.adjustHeight, this);
    },
    adjustHeight: function(toAdjust) {
        this.$el.toggleClass('bottom-double-space', toAdjust);
    },
    cleanCompleteModels: function(event) {
        this.collection.cleanCompleted();
        this.$el.removeClass('show');
        event.preventDefault();
    },
    toggleShow: function() {
        this.$el.toggleClass('show', !!this.collection.completeCount);
    },
    render: function() {
        var completeCount = this.collection.completeCount;

        this.$el
            .empty()
            .toggleClass('show', !!completeCount)
            .html('Clear Complete');

        return this;
    }
});