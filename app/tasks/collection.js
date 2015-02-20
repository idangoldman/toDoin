var _ = require('underscore'),
    Backbone = require('backbone'),
    Storage = require('backbone.localstorage'),
    TaskModel = require('./task/model'),

    Collection = Backbone.Collection.extend({
        all: function() {
            return this.slice();
        },
        cleanCompleted: function() {
            this.completeCount = 0;
            return _.invoke(this.complete(), 'destroy');
        },
        complete: function() {
            return this.where({complete: true});
        },
        getTaskOrder: function() {
            return this.length > 1 ? this.at(this.length - 2).get('order') + 1 : 1;
        },
        initialize: function() {
            this.on('add', this.onModelAdd);
            this.on('change:complete', this.updateCount);
        },
        localStorage: new Storage('ToDoin'),
        model: TaskModel,
        onModelAdd: function(model) {
            this.remainCount = this.remainCount + 1;
            model.set('order', this.getTaskOrder());
        },
        remain: function() {
            return this.where({complete: false});
        },
        reOrder: function(hash) {
            _.each(this.models, function(model) {
                model.update('order', hash[model.id]);
            });
        },
        updateCount: function() {
            this.remainCount = this.remain().length;
            this.completeCount = this.complete().length;
        }
    });

module.exports = new Collection();