define('CleanButtonView', ['backbone'], function(Backbone) {
    return Backbone.View.extend({
        tagName: 'button',
        attributes: {
            'type': 'button',
        },
        className: 'clean-button',
        initialize: function() {
            this.render();

            this.listenTo(this.collection, 'change:complete', this.render);
        },
        events: {
            'click': 'cleanCompleteModels'
        },
        cleanCompleteModels: function(event) {
            this.collection.cleanCompleted();

            if (Backbone.history.location.pathname === '/complete') {
                Backbone.history.navigate('/', {trigger: true});
            } else {
                this.remove();
            }

            event.preventDefault();
        },
        render: function() {
            var completeTasksCount = this.collection.complete().length,
                buttonText = null;

            if (completeTasksCount) {
                if (completeTasksCount > 1) {
                    buttonText = ['Eat', completeTasksCount, 'Cookies.'].join(' ');
                } else  {
                    buttonText = 'Eat a Cookie.';
                }

                this.$el
                    .empty()
                    .append(buttonText);

                this.$el
                    .parent().addClass('show-clean-button');
            } else {
                this.$el
                    .parent().removeClass('show-clean-button');
                this.remove();
            }

            return this;
        }
    });
});