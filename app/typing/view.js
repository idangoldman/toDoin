define('TypingView', ['backbone', 'TaskModel', 'text!templates/typing.html'], function(Backbone, TaskModel, Template) {
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
            'focus .title': 'focusOnTitle',
            'focusout .title': 'focusOnTitle',
            'keyup': 'escTask'
        },
        initialize: function() {
            this.render(this.model);

            Backbone.pubSub.on('task:edit', this.editTask, this);
            Backbone.pubSub.on('task:esc', this.escTask, this);
        },
        render: function(model) {
            this.model = model || new TaskModel();

            this.$el
                .empty()
                .append(this.template(this.model.toJSON()))
                .find('.title')
                    .prop('selectionStart', this.model.get('title').length)
                    .focus();

            return this;
        },
        focusOnTitle: function(event) {
            // debugger;
            // this.render();
            var bool = event.type === 'focusin' || false;
            this.$el.find('.title').attr('contentEditable', bool);
        },
        escTask: function(event) {
            if ((typeof event === 'string' && event === this.model.id) || (event.keyCode === 27 && this.model.id)) {
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