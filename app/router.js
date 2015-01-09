define('Router', ['backbone', 'AppView', 'TasksCollection'], function(Backbone, AppView, TasksCollection) {
    var Router = Backbone.Router.extend({
        initialize: function() {
            TasksCollection.fetch({reset:true, async:false});
            TasksCollection.updateCount();

            this.application = new AppView({collection: TasksCollection});

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
            this.application.TasksView.render(TasksCollection.all());
        },
        defaultAction: function(action) {
            console.log('#404 - No route:', action);
            this.navigate('/', {trigger: true});
        }
    });

    return new Router();
});