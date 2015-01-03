define('Router', ['backbone', 'AppView', 'TasksCollection'], function(Backbone, AppView, TasksCollection) {
    var Router = Backbone.Router.extend({
        initialize: function() {
            TasksCollection.fetch({reset:true});

            this.application = new AppView({collection: TasksCollection});

            Backbone.history.start({
                pushState: true,
                hashChange: false,
            });
        },
        routes: {
            '': 'home',
            'remain': 'remain',
            'complete': 'complete',
            '*action': 'defaultAction'
        },
        home: function() {
            this.application.HeaderView.render();
            this.application.TasksView.render(TasksCollection.all());
        },
        remain: function() {
            if (!TasksCollection.remain().length) {
                this.navigate('/', {trigger: true});
            } else {
                this.application.HeaderView.render('remain');
                this.application.TasksView.render(TasksCollection.remain());
            }
        },
        complete: function() {
            if (!TasksCollection.complete().length) {
                this.navigate('/', {trigger: true});
            } else {
                this.application.HeaderView.render('complete');
                this.application.TasksView.render(TasksCollection.complete());
            }
        },
        defaultAction: function(action) {
            console.log('#404 - No route:', action);
            this.navigate('/', {trigger: true});
        }
    });

    return new Router();
});