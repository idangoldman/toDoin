define('ListItemView', ['backbone', 'text!templates/list-item.html'], function(Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'change:complete', this.onComplete);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        template: _.template(Template),
        tagName: 'li',
        events: {
            'click .check-box': 'toggleComplete'
            'dblclick .field': 'editField'
        },
        toggleComplete: function() {
            this.model.toggle();
        },
        onComplete: function() {
            switch(Backbone.history.location.pathname) {
                case '/complete':
                    if (!this.collection.complete().length) {
                        Backbone.history.navigate('/', {trigger: true});
                    } else if (!this.model.get('complete')) {
                        this.remove();
                    }
                break;
                case '/remain':
                    if (!this.collection.remain().length) {
                        Backbone.history.navigate('/', {trigger: true});
                    } else if (this.model.get('complete')) {
                        this.remove();
                    }
                break;
            }
        editField: function () {
            // debugger;
            // this.vent.trigger('task:edit', this.model.get('id'));
        },
        render: function() {
            this.$el
                .empty()
                .append(this.template(this.model.toJSON()))
                .toggleClass('complete', this.model.get('complete'));

            return this;
        }
    });
});