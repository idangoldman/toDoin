define('ListItemModel', ['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            'order': null,
            'title': '',
            'complete': false
        },
        toggle: function () {
            this.save({
                complete: !this.get('complete')
            });
        }
    });
});