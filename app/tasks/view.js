define('TasksView', ['underscore', 'backbone', 'CleanButtonView', 'TaskView', 'text!templates/tasks.html'], function(_, Backbone, CleanButtonView, TaskView, Template) {
    return Backbone.View.extend({
        tagName: 'section',
        className: 'tasks',
        template: _.template(Template),
        initialize: function() {
            this.listenTo(this.collection, 'add', this.addTask);
            this.listenTo(this.collection, 'change:complete', this.toggleCleanButton);

            Backbone.pubSub.on('typing:adjust-height', this.adjustHeight, this);
        },
        adjustHeight: function(toAdjust) {
            this.$el.toggleClass('two-lines', toAdjust);
        },
        toggleCleanButton: function() {
            var completeTasksCount = this.collection.completeCount;

            if (Backbone.history.location.pathname !== '/remain') {
                if (!this.$el.find('.clean-button').length && completeTasksCount) {
                    this.$el
                        .addClass('show-clean-button')
                        .append(new CleanButtonView({collection: this.collection}).el);
                } else if (!completeTasksCount) {
                    this.$el
                        .removeClass('show-clean-button')
                        .find('.clean-button')
                            .remove();
                }
            }

        },
        addTask: function (model) {
            if (Backbone.history.location.pathname === '/complete') {
                Backbone.history.navigate('/remain', {trigger: true});
            } else {
                this.$('ul').append(new TaskView({model: model, collection: this.collection}).el);
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

                return new TaskView({model: model, collection: that.collection}).el;
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