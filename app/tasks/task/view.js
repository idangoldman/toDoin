var Backbone = require('backbone'),
    Vent = require('../../vent'),
    Utility = require('../../utility/_main'),
    Template = require('./template.html');

module.exports = Backbone.View.extend({
    editField: function () {
        if (!this.model.get('complete')) {
            Vent.trigger('typing:edit', this.model.get('id'));
        }
    },
    events: {
        'click .check-box': 'toggleComplete',
        'dblclick .field': 'editField'
    },
    initialize: function() {
        this.render();

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
        var model = this.model.toJSON();

        model.direction = Utility.direction.is(model.title);

        this.$el
            .empty()
            .attr('id', this.model.get('id'))
            .append(this.template(model))
            .toggleClass('complete', this.model.get('complete'));

        return this;
    },
    tagName: 'li',
    template: Template,
    toggleComplete: function() {
        this.model.toggle();

        if (this.model.get('complete')) {
            Vent.trigger('typing:esc', this.model.id);
        }
    }
});