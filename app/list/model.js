define('ListModel', ['underscore', 'backbone'], function(_, Backbone) {
    return Backbone.Model.extend({
        initialize: function() {
        },
        defaults: {
            'order': null,
            'title': '',
            'complete': false
        },
        toggle: function () {
            this.save({
                completed: !this.get('complete')
            });
        }
    });
});