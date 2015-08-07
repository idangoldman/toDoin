var _ = require('underscore'),
    Backbone = require('backbone'),
    Storage = require('backbone.localstorage'),
    TodoModel = require('./todo/model'),

    Collection = Backbone.Collection.extend({
        all: function() {
            return this.slice();
        },
        cleanCompleted: function() {
            this.completeCount = 0;
            return _.invoke(this.complete(), 'destroy');
        },
        getTodoOrder: function() {
            return this.length > 1 ? this.at(this.length - 2).get('order') + 1 : 1;
        },
        initialize: function() {
            this.on('add', this.onModelAdd);
            this.on('change:complete', this.updateCount);
        },
        localStorage: new Storage('ToDoin'),
        model: TodoModel,
        onModelAdd: function(model) {
            this.remainCount = this.remainCount + 1;
            model.set('order', this.getTodoOrder());
        },
        reOrder: function(hash) {
            _.each(this.models, function(model) {
                model.save({'order': hash[model.id]});
            });
        },
        sortBy: function(type, direction) {
            direction = direction || 'asc';
            return _.sortBy(this.models, function(model) {
                return direction === 'asc' ? model.get(type) : !model.get(type);
            });
        },
        updateCount: function() {
            this.remainCount = this.where({complete: false}).length;
            this.completeCount = this.where({complete: true}).length;
        }
    });

module.exports = new Collection();