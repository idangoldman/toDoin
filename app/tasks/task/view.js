var Backbone = require('backbone'),
    Vent = require('../../vent'),
    Template = require('./template.html');

module.exports = Backbone.View.extend({
    initialize: function() {
        this.render();

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'change:complete', this.onComplete);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    template: Template,
    tagName: 'li',
    events: {
        'click .check-box': 'toggleComplete',
        'dblclick .field': 'editField'
    },
    toggleComplete: function() {
        this.model.toggle();

        if (this.model.get('complete')) {
            Vent.trigger('typing:esc', this.model.id);
        }
    },
    onComplete: function() {
        switch(Backbone.history.location.pathname) {
            case '/complete':
                if (!this.collection.completeCount) {
                    Backbone.history.navigate('/', {trigger: true});
                } else if (!this.model.get('complete')) {
                    this.remove();
                }
            break;
            case '/remain':
                if (!this.collection.remainCount) {
                    Backbone.history.navigate('/', {trigger: true});
                } else if (this.model.get('complete')) {
                    this.remove();
                }
            break;
        }
    },
    editField: function () {
        if (!this.model.get('complete')) {
            Vent.trigger('typing:edit', this.model.get('id'));
        }
    },
    render: function() {
        this.$el
            .empty()
            .attr('id', this.model.get('id'))
            .append(this.template(this.model.toJSON()))
            .toggleClass('complete', this.model.get('complete'));

        return this;
    }
});