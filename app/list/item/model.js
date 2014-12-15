define('ListItemModel', ['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            title    : '',
            order    : null,
            complete : false
        },
        toggle: function () {
            return this.save('complete', !this.get('complete'));
        }
    });
});