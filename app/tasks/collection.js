define('TasksCollection', ['backbone', 'backboneLocalstorage', 'TaskModel'], function(Backbone, Storage, TaskModel) {
    var Collection = Backbone.Collection.extend({
        initialize: function() {
            this.on('add', this.onModelAdd);
            this.on('change:complete', this.updateCount);
        },
        localStorage: new Store('ToDoin'),
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

    return new Collection();
});