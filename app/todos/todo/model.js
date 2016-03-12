var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    defaults: {
        complete: false,
        completed_at: null,
        created_at: Date.now(),
        id: null,
        order: null,
        privacy: false,
        title: ''
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
    }
});