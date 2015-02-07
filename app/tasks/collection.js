var _ = require('underscore'),
    Backbone = require('backbone'),
    Storage = require('backbone.localstorage'),
    TaskModel = require('./task/model'),

    Collection = Backbone.Collection.extend({
        initialize: function() {
            this.on('add', this.onModelAdd);
            this.on('change:complete', this.updateCount);
        },
        localStorage: new Storage('ToDoin'),
        model: TaskModel,
        getTaskOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        onModelAdd: function(model) {
            this.remainCount = this.remainCount + 1;
            model.set('order', this.getTaskOrder());
        },
        cleanCompleted: function() {
            this.completeCount = 0;
            return _.invoke(this.complete(), 'destroy');
        },
        updateCount: function() {
            this.remainCount = this.remain().length;
            this.completeCount = this.complete().length;
        },
        complete: function () {
            return this.where({complete: true});
        },
        remain: function () {
            return this.where({complete: false});
        },
        all: function () {
            return this.slice();
        }
    });

module.exports = new Collection();