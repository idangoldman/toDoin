define('ListCollection', ['backbone', 'backboneLocalstorage', 'ListItemModel'], function(Backbone, Storage, ListItemModel) {
    var Collection = Backbone.Collection.extend({
        initialize: function() {
            this.on('add', this.onModelAdd);
            this.on('change', this.onModelChange);
        },
        localStorage: new Store('ToDoin'),
        model: ListItemModel,
        getTaskOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        onModelAdd: function(model) {
            model.set('order', this.getTaskOrder());

            if (Backbone.history.location.pathname === '/complete') {
                Backbone.history.navigate('/remain', {trigger: true});
            } else {
                Backbone.history.loadUrl(Backbone.history.fragment);
            }
        },
        onModelChange: function () {
            if (Backbone.history.location.pathname === '/complete' && !this.complete().length) {
                Backbone.history.navigate('/', {trigger: true});
            } else {
                Backbone.history.loadUrl(Backbone.history.fragment);
            }
        },
        cleanCompleted: function() {
            _.invoke(this.complete(), 'destroy');

            if (Backbone.history.location.pathname === '/complete') {
                Backbone.history.navigate('/', {trigger: true});
            } else {
                Backbone.history.loadUrl(Backbone.history.fragment);
            }
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