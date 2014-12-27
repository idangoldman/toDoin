define('ListItemView', ['backbone', 'text!templates/list-item.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        template: _.template(Template),
        tagName: 'li',
        events: {
            'click .checkbox': 'toggleComplete'
        },
        toggleComplete: function () {
            this.model.toggle();
        },
        render: function() {
            // console.log('change!');
            this.$el
                .empty()
                .append(this.template(this.model.toJSON()))
                .toggleClass('complete', this.model.get('complete'));

            return this;
        }
    });
});