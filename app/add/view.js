define('AddView', ['backbone', 'text!templates/add.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.render(this.template, this.model);
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
        render: function(template, model) {
            this.$el.empty();
            this.$el.html(template(model));

            return this;
        },
        createTask: function(event) {
            var value = this.$('.title').val().trim();

            if (value.length) {
                this.collection.create({title: value});
                this.$('.title').val('');
            }

            event.preventDefault();
        }
    });
});