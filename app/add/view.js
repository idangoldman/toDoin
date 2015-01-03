define('AddView', ['backbone', 'TaskModel', 'text!templates/add.html'], function(Backbone, TaskModel, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.render(this.model);

            Backbone.pubSub.on('task:edit', this.editTask, this);
        },
        events: {
            'submit': 'createTask',
            'keyup': 'escTask'
        },
        template: _.template(Template),
        tagName: 'form',
        className: 'add',
        attributes: {
            'action': 'blah.js',
            'method': 'post'
        },
        render: function(model) {
            this.model = model || new TaskModel();

            this.$el
                .empty()
                .append(this.template(this.model.toJSON()))
                .find('.title')
                    .focus();

            return this;
        },
        escTask: function(event) {
            if(event.keyCode === 27 && this.model.id) {
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

            event.preventDefault();
        },
        editTask: function(taskId) {
            this.render(this.collection.get(taskId));
        }
    });
});