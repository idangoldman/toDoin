var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    Vent = require('../vent'),
    CleanButtonView = require('./clean-button/view'),
    TaskView = require('./task/view'),
    Template = require('./template.html'),

    // This is global
    Sortable = require('../../bower_components/html5sortable/jquery.sortable');

module.exports = Backbone.View.extend({
    tagName: 'section',
    className: 'tasks',
    template: Template,
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addTask);
        this.listenTo(this.collection, 'change:complete', this.toggleCleanButton);

        this.$el.on('sortupdate', '.list', $.proxy(this.reOrder, this));

        Vent.on('typing:adjust-height', this.adjustHeight, this);
    },
    addTask: function (model) {
        this.$('.list')
            .append(new TaskView({
                model: model,
                collection: this.collection
            }).el)
            .sortable('destroy')
            .sortable();
    },
    adjustHeight: function(toAdjust) {
        this.$el.toggleClass('two-lines', toAdjust);
    },
    toggleCleanButton: function() {
        var completeTasksCount = this.collection.completeCount;

        if (!this.$('.clean-button').length && completeTasksCount) {
            this.$el
                .addClass('show-clean-button')
                .append(new CleanButtonView({
                    collection: this.collection
                }).el);
        } else if (!completeTasksCount) {
            this.$el
                .removeClass('show-clean-button')
                .find('.clean-button')
                    .remove();
        }
    },
    reOrder: function($event) {
        var reOrderHash = {};

        this.$el.find('.list li').each(function(index, item) {
            reOrderHash[item.id] = index + 1;
        });

        this.collection.reOrder(reOrderHash);
    },
    render: function(collection) {
        var completeModel = false,
            that = this;

        this.$el
            .empty()
            .append(this.template());

        collection = _.sortBy(collection, function(model) {
            return model.get('order');
        });

        this.$('.list').append(_.map(collection, function(model) {
            if (model.get('complete')) {
                completeModel = true;
            }

            return new TaskView({
                    model: model,
                    collection: that.collection
                }).el;
        })).sortable();

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