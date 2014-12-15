define('ListCollection', ['backbone', 'backboneLocalstorage', 'ListItemModel'], function(Backbone, Storage, ListItemModel) {
    var Collection = Backbone.Collection.extend({
        initialize: function() {
            this.on('add', this.onModelAdd);
            this._modeFilter = 'remain';
        },
        localStorage: new Store('ToDoin'),
        model: ListItemModel,
        getModeFilter: function() {
            return this._modeFilter;
        },
        setModeFilter: function(modeFilter) {
            if (modeFilter === 'complete' || modeFilter === 'remain') {
                this._modeFilter = modeFilter;
            }
            return this;
        },
        getTaskOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        onModelAdd: function(model) {
            this.setModeFilter('remain');
            model.set('order', this.getTaskOrder());
        },
        complete: function () {
            return this.where({complete: true});
        },
        remain: function () {
            return this.where({complete: false});
        },
        all: function () {
            return this.toJSON();
        }
    });

    return new Collection();
});