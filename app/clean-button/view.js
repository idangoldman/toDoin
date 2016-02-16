var _ = require('underscore'),
    Backbone = require('backbone'),
    Utility = require('../utility/.main');

module.exports = Backbone.View.extend({
    tagName: 'button',
    attributes: {
        'type': 'button',
    },
    className: 'clean-button',
    events: {
        'click': 'cleanCompleteModels'
    },
    eatText: [{
        one: 'Cookie',
        many: 'Cookies'
    },
    {
        one: 'Walnut',
        many: 'Walnuts'
    },
    {
        one: 'Apple',
        many: 'Apples'
    },
    {
        one: 'Cucumber',
        many: 'Cucumbers'
    },
    {
        one: 'Banana',
        many: 'Bananas'
    },
    {
        one: 'Tomato',
        many: 'Tomatoes'
    }],
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
    pickButtonText: function(completeCount) {
        var eatText = _.sample(this.eatText),
            buttonText = '',
            noun = 'a';

        if (completeCount > 1) {
            buttonText = ['Eat', completeCount,  eatText.many + '.'].join(' ');
        } else {
            if (eatText.one === 'Apple') {
                noun = 'an';
            }

            buttonText = ['Eat', noun, eatText.one + '.'].join(' ');
        }
        return buttonText;
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