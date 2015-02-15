var _ = require('underscore'),
    Backbone = require('backbone'),
    Vent = require('../vent'),
    TaskModel = require('../tasks/task/model'),
    Template = require('./template.html'),

    Utility = require('../utility/_main');

module.exports = Backbone.View.extend({
    tagName: 'form',
    template: Template,
    className: 'typing',
    attributes: {
        'action': 'blah.js',
        'method': 'post'
    },
    events: {
        'submit': 'createTask',
        'keydown': 'pressKeys',
        'keyup': 'adjustHeight'
    },
    initialize: function() {
        this.render(this.model);
        this.$el.focus();

        Vent.on('typing:edit', this.editTask, this);
        Vent.on('typing:esc', this.escTask, this);
    },
    render: function(model) {
        this.model = model || new TaskModel();
        this.model.set('paraphrase', '');

        this.$el
            .empty()
            .append(this.template(this.model.toJSON()))
            .find('.title');

        return this;
    },
    adjustHeight: function() {
        var toggleHeight = !!( this.$('.title').val().trim().length && ( this.$('.title').prop('scrollHeight') >= parseInt( this.$('.title').css('max-height') ) ) );

        this.$('.title').toggleClass('two-lines',  toggleHeight);
        Vent.trigger('typing:adjust-height', toggleHeight);
    },
    pressKeys: function(event) {
        switch(Utility.keystroke.which(event.keyCode)) {
            case 'enter':
                this.$el.submit();
                return false;
            case 'esc':
                this.escTask(event);
            break;
            case 'shift+enter':
            case 'tab':
                this.adjustHeight();
                return false;
            default:
                if (event.type === 'focusout') {
                    this.escTask(event);
                }
            break;
        }
    },
    escTask: function(event) {
        var ifSameTask = typeof event === 'string' && event === this.model.id,
            ifModelExist = Utility.keystroke.is('esc', event.keyCode) && this.model.id,
            ifFocusOut = event.type === 'focusout';

        if (ifSameTask || ifModelExist || ifFocusOut) {
            this.render();

            if (ifSameTask || ifModelExist) {
                this.$('.title')
                    .focus();
            }
        }
    },
    createTask: function(event) {
        var value = Utility.escaping(this.$('.title').val().trim());

        if (value.length) {
            if (this.model.id) {
                this.model.update('title', value);
            } else {
                this.collection.create({title: value});
            }

            this.render();
            this.$('.title')
                .focus();
        }

        return event && event.preventDefault();
    },
    editTask: function(taskId) {
        this.render(this.collection.get(taskId));
        this.adjustHeight();

        this.$('.title')
            .prop('selectionStart', this.model.get('title').length)
            .focus();
    }
});