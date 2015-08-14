var _ = require('underscore'),
    Backbone = require('backbone'),
    Utility = require('../utility/.main');

module.exports = Backbone.View.extend({
    tagName: 'button',
    attributes: {
        'type': 'button',
    },
    className: 'clean-button',
    initialize: function() {
        this.render();
        this.listenTo(this.collection, 'change:complete', this.render);
        Utility.vent.on('typing:adjust-height', this.adjustHeight, this);
    },
    events: {
        'click': 'cleanCompleteModels'
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
    pickButtonText: function(completeCount) {
        return 'Clear Complete ' + (completeCount > 1 ? 'Todos' : 'Todo');
    },
    render: function() {
        var completeCount = this.collection.completeCount,
            buttonText = this.pickButtonText(completeCount);

        this.$el
            .empty()
            .toggleClass('show', !!completeCount)
            .append(buttonText);

        return this;
    }
});