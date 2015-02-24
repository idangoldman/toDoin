var Backbone = require('backbone'),
    AppView = require('./view'),
    TodosCollection = require('./todos/collection'),

    Router = Backbone.Router.extend({
        initialize: function() {
            TodosCollection.fetch({reset:true, async:false});
            TodosCollection.updateCount();

            this.application = new AppView({collection: TodosCollection});

            Backbone.history.start({
                pushState: true,
                hashChange: false,
            });
        },
        routes: {
            '': 'home',
            '*action': 'defaultAction'
        },
        home: function() {
            this.application.HeaderView.render();
            this.application.TodosView.render(TodosCollection.all());
        },
        defaultAction: function(action) {
            console.log('#404 - No route:', action);
            this.navigate('/', {trigger: true});
        }
    });

module.exports = new Router();
