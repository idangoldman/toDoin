var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    Template = require('./template.html'),
    TodoView = require('./todo/view'),
    Utility = require('common/utility/.main'),

    // This is global
    Sortable = require('../../bower_components/html5sortable/jquery.sortable');

module.exports = Backbone.View.extend({
    tagName: 'section',
    className: 'todos',
    template: Template,
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addTodo);
        this.listenTo(this.collection, 'change:complete', this.toggleComplete);
        this.$el.on('sortupdate', '.list', $.proxy(this.reOrder, this));
        Utility.vent.on('typing:adjust-height', this.adjustHeight, this);
    },
    addTodo: function (model) {
        this.$('.list')
            .append(new TodoView({ model: model, collection: this.collection }).el)
            .sortable('destroy')
            .sortable();
    },
    toggleComplete: function() {
        var splitedPath = window.location.pathname.split('/');
        var type = splitedPath[splitedPath.length - 1];

        if (type.length) {
            this.render(this.collection.sortBy(type, 'desc'));
        }

        this.$el.toggleClass('bottom-padding', !!this.collection.completeCount);
    },
    adjustHeight: function(toAdjust) {
        this.$el.toggleClass('two-lines', toAdjust);
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
        this.$el
            .empty()
            .append(this.template())
            .toggleClass('bottom-padding', !!this.collection.completeCount)
            .find('.list')
                .append(_.map(collection, function(model) {
                    return new TodoView({ model: model, collection: this.collection }).el;
                }, this)).sortable();

        return this;
    }
});