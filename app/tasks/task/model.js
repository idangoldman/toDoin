define('TaskModel', ['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            id: null,
            title: '',
            order: null,
            complete: false
        },
        toggle: function () {
            return this.save('complete', !this.get('complete'));
        },
        update: function (field, value) {
            return this.save(field, value);
        }
    });
});