define('TypingView', ['backbone', 'TaskModel', 'text!templates/typing.html'], function(Backbone, TaskModel, Template) {

    function isKey(keyName, code) {
        var result = null;

        switch(code) {
            case 27:
                result = 'esc';
            break;
            case 13:
                result = 'enter';
            break;
        }

        return keyName === result || false;
    }

    return Backbone.View.extend({
        tagName: 'form',
        template: _.template(Template),
        className: 'typing',
        attributes: {
            'action': 'blah.js',
            'method': 'post'
        },
        events: {
            'submit': 'createTask',
            'keydown': 'pressEnter',
            'keyup': 'escTask'
        },
        initialize: function() {
            this.render(this.model);

            Backbone.pubSub.on('task:edit', this.editTask, this);
            Backbone.pubSub.on('task:esc', this.escTask, this);
        },
        render: function(model) {
            this.model = model || new TaskModel();
            this.model.set('paraphrase', '');

            this.$el
                .empty()
                .append(this.template(this.model.toJSON()))
                .find('.title')
                    .prop('selectionStart', this.model.get('title').length)
                    .focus();

            return this;
        },
        pressEnter: function(event) {
            if (isKey('enter', event.keyCode)) {
                this.$el.submit();
                return false;
            }
        },
        escTask: function(event) {
            if ((typeof event === 'string' && event === this.model.id) || (isKey('esc', event.keyCode) && this.model.id)) {
                this.render();
            }
        },
        createTask: function(event) {
            var value = this.$('.title').val().trim();

            if (value.length) {
                if (this.model.id) {
                    this.model.update('title', value);
                } else {
                    this.collection.create({title: value});
                }

                this.render();
            }

            return event && event.preventDefault();
        },
        editTask: function(taskId) {
            this.render(this.collection.get(taskId));
        }
    });
});