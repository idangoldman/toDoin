define('ListCollection', ['backbone', 'ListModel'], function(Backbone, ListModel) {
    return Backbone.Collection.extend({
        initialize: function() {
            this.bind('add', this.onModelAdd);
        },
        model: ListModel,
        setTaskOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        onModelAdd: function(model) {
            // debugger;
            model.set('order', this.setTaskOrder());
        },
        comparator: 'order'
    });
});