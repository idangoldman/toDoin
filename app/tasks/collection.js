define('TasksCollection', ['backbone', 'backboneLocalstorage', 'TaskModel'], function(Backbone, Storage, TaskModel) {
    var Collection = Backbone.Collection.extend({
        initialize: function() {
            this.on('add', this.onModelAdd);
        },
        localStorage: new Store('ToDoin'),
        model: TaskModel,
        getTaskOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        onModelAdd: function(model) {
            model.set('order', this.getTaskOrder());
        },
        cleanCompleted: function() {
            return _.invoke(this.complete(), 'destroy');
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