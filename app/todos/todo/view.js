var Backbone = require('backbone'),
    Template = require('./template.html'),
    Utility = require('common/utility/.main'),
    Blah = require('common/blah/.main');

module.exports = Backbone.View.extend({
    className: 'todo',
    editField: function () {
        if (!this.model.get('complete')) {
            Utility.vent.trigger('typing:edit', this.model.get('id'));
        }
    },
    events: {
        'click .check-box': 'toggleComplete',
        'dblclick .title': 'editField'
    },
    initialize: function() {
        this.render();

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
        var model = this.model.toJSON();

        model.title = Blah.html(model.title);
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
            Utility.vent.trigger('typing:esc', this.model.id);
        }
    }
});