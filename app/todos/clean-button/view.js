var _ = require('underscore'),
    Backbone = require('backbone');

module.exports = Backbone.View.extend({
    tagName: 'button',
    attributes: {
        'type': 'button',
    },
    className: 'clean-button',
    initialize: function() {
        this.render();

        this.listenTo(this.collection, 'change:complete', this.render);
    },
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
    cleanCompleteModels: function(event) {
        this.collection.cleanCompleted();

        this.$el
            .parent().removeClass('show-clean-button');
        this.remove();

        event.preventDefault();
    },
    render: function() {
        var completeTasksCount = this.collection.completeCount,
            buttonText = null,
            eatText = _.sample(this.eatText);

        if (completeTasksCount) {
            if (completeTasksCount > 1) {
                buttonText = ['Eat', completeTasksCount,  eatText.many + '.'].join(' ');
            } else  {
                buttonText = ['Eat a', eatText.one + '.'].join(' ');
            }

            this.$el
                .empty()
                .append(buttonText);

            this.$el
                .parent().addClass('show-clean-button');
        } else {
            this.$el
                .parent().removeClass('show-clean-button');
            this.remove();
        }

        return this;
    }
});