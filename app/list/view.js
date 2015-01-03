define('ListView', ['underscore', 'backbone', 'CleanButtonView', 'ListItemView', 'text!templates/list.html'], function(_, Backbone, CleanButtonView, ListItemView, Template) {
    return Backbone.View.extend({
        tagName: 'section',
        className: 'tasks',
        template: _.template(Template),
        initialize: function() {
            this.listenTo(this.collection, 'add', this.addTask);
            this.listenTo(this.collection, 'change:complete', this.toggleCleanButton);
        },
        toggleCleanButton: function() {
            var completeTasksCount = this.collection.complete().length;

            if (completeTasksCount && !this.$el.has('.clean-button').length) {
                this.$el
                    .append(new CleanButtonView({collection: this.collection}).el);
            }

            if (completeTasksCount) {
                this.$el.addClass('show-clean-button', completeTasksCount);
            }

        },
        addTask: function (model) {
            if (Backbone.history.location.pathname === '/complete') {
                Backbone.history.navigate('/remain', {trigger: true});
            } else {
                this.$('ul').append(new ListItemView({model: model, collection: this.collection}).el);
            }
        },
        render: function(collection) {
            var completeModel = false,
                that = this;

            this.$el
                .empty()
                .append(this.template());

            this.$('ul').append(_.map(collection, function(model) {
                if (model.get('complete')) {
                    completeModel = true;
                }

                return new ListItemView({model: model, collection: that.collection}).el;
            }));

            if (completeModel && Backbone.history.location.pathname !== '/remain') {
                this.$el
                    .addClass('show-clean-button')
                    .append(new CleanButtonView({collection: this.collection}).el);
            } else {
                this.$el.removeClass('show-clean-button');
            }

            return this;
        }
    });
});