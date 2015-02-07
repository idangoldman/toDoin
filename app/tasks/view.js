var _ = require('underscore'),
    Backbone = require('backbone'),
    Vent = require('../vent'),
    CleanButtonView = require('./clean-button/view'),
    TaskView = require('./task/view'),
    Template = require('./template.html');

module.exports = Backbone.View.extend({
    tagName: 'section',
    className: 'tasks',
    template: Template,
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addTask);
        this.listenTo(this.collection, 'change:complete', this.toggleCleanButton);

        Vent.on('typing:adjust-height', this.adjustHeight, this);
    },
    adjustHeight: function(toAdjust) {
        this.$el.toggleClass('two-lines', toAdjust);
    },
    toggleCleanButton: function() {
        var completeTasksCount = this.collection.completeCount;

        if (!this.$el.find('.clean-button').length && completeTasksCount) {
            this.$el
                .addClass('show-clean-button')
                .append(new CleanButtonView({collection: this.collection}).el);
        } else if (!completeTasksCount) {
            this.$el
                .removeClass('show-clean-button')
                .find('.clean-button')
                    .remove();
        }

    },
    addTask: function (model) {
        this.$('ul').append(new TaskView({model: model, collection: this.collection}).el);
    },
    render: function(collection) {
        var completeModel = false,
            that = this;

        this.$el
            .empty()
            .append(this.template());

        this.$('ul').append(_.map(collection, function(model) {
            if (model.get('complete')) {
                completeModel = true;
            }

            return new TaskView({model: model, collection: that.collection}).el;
        }));

        if (completeModel) {
            this.$el
                .addClass('show-clean-button')
                .append(new CleanButtonView({collection: this.collection}).el);
        } else {
            this.$el.removeClass('show-clean-button');
        }

        return this;
    }
});