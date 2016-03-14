var Backbone = require('backbone'),
    AppView = require('./view'),
    TodosCollection = require('./todos/collection'),

    Router = Backbone.Router.extend({
        initialize: function() {
            TodosCollection.fetch({reset:true, async:false});
            TodosCollection.updateBadgeCount();

            this.application = new AppView({collection: TodosCollection});

            Backbone.history.start({
                pushState: true,
                hashChange: false,
            });
        },
        routes: {
            '': 'home',
            'sort-by/:type': 'sortBy',
            '*action': 'defaultAction',
        },
        home: function() {
            this.application.TodosView.render(TodosCollection.sortBy('order'));
        },
        sortBy: function(type) {
            this.application.TodosView.render(TodosCollection.sortBy(type, 'desc'));
        },
        defaultAction: function(action) {
            console.log('#404 - No route:', action);
            this.navigate('/', {trigger: true});
        },
    });

module.exports = new Router();
