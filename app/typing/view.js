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
            'keydown': 'pressKeys',
            'keyup': 'adjustHeight'
        },
        initialize: function() {
            this.render(this.model);
            this.$el.focus();

            Backbone.pubSub.on('typing:edit', this.editTask, this);
            Backbone.pubSub.on('typing:esc', this.escTask, this);
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
            Backbone.pubSub.trigger('typing:adjust-height', toggleHeight);
        },
        pressKeys: function(event) {
            if (isKey('enter', event.keyCode)) {
                this.$el.submit();
                return false;
            } else if (isKey('esc', event.keyCode)) {
                this.escTask(event);
            } else if (event.type === 'focusout') {
                this.escTask(event);
            } else {
                this.adjustHeight();
            }
        },
        escTask: function(event) {
            var ifSameTask = typeof event === 'string' && event === this.model.id,
                ifModelExist = isKey('esc', event.keyCode) && this.model.id,
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
            var value = this.$('.title').val().trim();

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
});