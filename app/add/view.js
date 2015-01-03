define('AddView', ['backbone', 'text!templates/add.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.render(this.model);

            Backbone.pubSub.on('task:edit', this.editTask, this);
        },
        events: {
            'submit': 'createTask'
        },
        template: _.template(Template),
        tagName: 'form',
        className: 'add',
        attributes: {
            'action': 'blah.js',
            'method': 'post'
        },
        render: function(model) {
            model = model && model.toJSON() || {id: '', title: ''};
            this.$el
                .empty()
                .append(this.template(model))
                .find('.title')
                    .focus();

            return this;
        },
        createTask: function(event) {
            var value = this.$('.title').val().trim();

// debugger;
            if (value.length) {
                this.collection.create({title: value});
                this.$('.title').val('');
            }

            event.preventDefault();
        },
        editTask: function(taskId) {
            this.render(this.collection.get(taskId));
        }
    });
});