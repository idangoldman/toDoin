var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    CleanButtonView = require('./clean-button/view'),
    Template = require('./template.html'),
    TodoView = require('./todo/view'),
    Utility = require('../utility/.main'),

    // This is global
    Sortable = require('../../bower_components/html5sortable/jquery.sortable');

module.exports = Backbone.View.extend({
    tagName: 'section',
    className: 'todos',
    template: Template,
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addTodo);
        this.listenTo(this.collection, 'change:complete', this.toggleCleanButton);

        this.$el.on('sortupdate', '.list', $.proxy(this.reOrder, this));

        Utility.vent.on('typing:adjust-height', this.adjustHeight, this);
    },
    addTodo: function (model) {
        this.$('.list')
            .append(new TodoView({
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
        var completeTodosCount = this.collection.completeCount;

        if (!this.$('.clean-button').length && completeTodosCount) {
            this.$el
                .addClass('show-clean-button')
                .append(new CleanButtonView({
                    collection: this.collection
                }).el);
        } else if (!completeTodosCount) {
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
        Backbone.history.navigate('/', {trigger: true});
    },
    render: function(collection) {
        var completeModel = false,
            that = this;

        this.$el
            .empty()
            .append(this.template());

        this.$('.list').append(_.map(collection, function(model) {
            if (model.get('complete')) {
                completeModel = true;
            }

            return new TodoView({
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