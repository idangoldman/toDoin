var _ = require('underscore'),
    Backbone = require('backbone'),
    TodoModel = require('../todos/todo/model'),
    Template = require('./template.html'),

    Utility = require('../utility/.main');

module.exports = Backbone.View.extend({
    tagName: 'form',
    template: Template,
    className: 'typing',
    attributes: {
        'action': 'blah.js',
        'method': 'post'
    },
    events: {
        'submit': 'createTodo',
        'keydown': 'pressKeys',
        'keyup': 'adjustHeight',
        'click .toggle-privacy': 'togglePrivacy'
    },
    togglePrivacy: function(event) {
        this.$('.toggle-privacy').toggleClass('active');
        this.$('.title').focus();
        event.preventDefault();
    },
    initialize: function() {
        this.render(this.model);
        this.$el.focus();

        Utility.vent.on('typing:edit', this.editTodo, this);
        Utility.vent.on('typing:esc', this.escTodo, this);
    },
    render: function(model) {
        this.model = model || new TodoModel();

        this.$el
            .empty()
            .append(this.template(this.model.toJSON()))
            .find('.title')
            .focus();

        return this;
    },
    adjustHeight: function() {
        var toggleHeight = !!( this.$('.title').val().trim().length && ( this.$('.title').prop('scrollHeight') >= parseInt( this.$('.title').css('max-height'), 10 ) ) ),
            text = _.escape(this.$('.title').val().trim());

        this.$('.title')
            .toggleClass('rtl', Utility.direction.isRTL(text))
            .toggleClass('two-lines',  toggleHeight);

        Utility.vent.trigger('typing:adjust-height', toggleHeight);
    },
    pressKeys: function(event) {
        switch(Utility.keystroke.which(event)) {
            case 'enter':
                this.$el.submit();
                return false;
            case 'esc':
                this.escTodo(event);
            break;
            case 'shift+enter':
            case 'tab':
                this.adjustHeight();
                return false;
            default:
                if (event.type === 'focusout') {
                    this.escTodo(event);
                }
            break;
        }
    },
    escTodo: function(event) {
        var ifSameTodo = typeof event === 'string' && event === this.model.id,
            ifModelExist = Utility.keystroke.is('esc', event) && this.model.id;

        if (ifSameTodo || ifModelExist) {
            this.render();

            this.$('.title')
                .focus();
        }
    },
    createTodo: function(event) {
        var value = _.escape(this.$('.title').val().trim()),
            model = {
                title: '',
                privacy: false
            };

        if (value.length) {
            model.title = value;

            // check if private
            if (this.$('.active').length) {
                model.privacy = true;
            }

            // submit todo
            if (this.model.id) {
                this.model.save(model);
            } else {
                this.collection.create(model);
            }

            this.render();
            this.$('.title')
                .focus();
        }

        return event.preventDefault();
    },
    editTodo: function(todo_id) {
        this.render(this.collection.get(todo_id));
        this.adjustHeight();

        this.$('.title')
            .prop('selectionStart', this.model.get('title').length)
            .focus();
    }
});