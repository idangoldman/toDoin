var Backbone = require('backbone'),
    Template = require('./template.html');

module.exports = Backbone.View.extend({
    tagName: 'header',
    template: Template,
    model: {
        version: '1.5.3'
    },
    initialize: function() {
        this.render(this.model);
    },
    events: {
        'click .sort-by a': 'navigate'
    },
    navigate: function(event) {
        Backbone.history.navigate(event.target.pathname, {trigger: true});
        event.preventDefault();
    },
    render: function() {
        this.$el
            .empty()
            .append(this.template(this.model));

        return this;
    }
});