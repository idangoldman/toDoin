var $ = require('jquery'),
    Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    defaults: {
        id: null,
        title: '',
        order: null,
        complete: false,
        created_at: Date.now(),
        completed_at: null
    },
    toggle: function () {
        var saveParams = {
            'complete': !this.get('complete'),
            'completed_at': null
        };

        if (saveParams.complete) {
            saveParams.completed_at = Date.now();
        }

        return this.save(saveParams);
    },
    update: function (field, value) {
        return this.save(field, value);
    }
});