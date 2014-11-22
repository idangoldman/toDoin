define('ListCollection', ['backbone', 'backboneLocalstorage', 'ListItemModel'], function(Backbone, Storage, ListItemModel) {
    var Collection = Backbone.Collection.extend({
        initialize: function() {
            this.bind('add', this.onModelAdd);
            this.modeFilter = 'remain';
        },
        localStorage: new Store('todos-simple'),
        model: ListItemModel,
        setTaskOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        onModelAdd: function(model) {
            this.modeFilter = 'remain';
            model.set('order', this.setTaskOrder());
        },
        complete: function () {
            return this.where({complete: true});
        },
        remain: function () {
            return this.where({complete: false});
        }
    });

    return new Collection();
});