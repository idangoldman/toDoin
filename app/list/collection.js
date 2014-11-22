define('ListCollection', ['backbone', 'backboneLocalstorage', 'ListModel'], function(Backbone, Storage, ListModel) {
    var Collection = Backbone.Collection.extend({
        initialize: function() {
            this.bind('add', this.onModelAdd);
        },
        localStorage: new Store('todos-simple'),
        model: ListModel,
        setTaskOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        onModelAdd: function(model) {
            model.set('order', this.setTaskOrder());
        },
    });

    return new Collection();
});