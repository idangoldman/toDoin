define('ListView', ['underscore', 'backbone', 'ListItemView', 'text!templates/list.html'], function(_, Backbone, ListItemView, Template) {
    return Backbone.View.extend({
        tagName: 'section',
        className: 'tasks',
        template: _.template(Template),
        events: {
            'click .clean-list button': 'cleanCompleteModels'
        },
        showCleanListBotton: function(bool) {
            this.$el.toggleClass('show-clean-list-button', bool);
        },
        cleanCompleteModels: function(event) {
            this.collection.cleanCompleted();

            if (Backbone.history.location.pathname === '/complete') {
                Backbone.history.navigate('/', {trigger: true});
            } else {
                this.showCleanListBotton(false);
            }

            event.preventDefault();
        },
        render: function(collection) {
            var completeModel = false;

            this.$el
                .empty()
                .append(this.template({completeCount: this.collection.complete().length}));

            this.$('ul').append(_.map(collection, function(model) {
                if (model.get('complete')) {
                    completeModel = true;
                }

                return new ListItemView({model: model}).el;
            }));

            this.showCleanListBotton(completeModel);

            return this;
        }
    });
});