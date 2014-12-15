define('Router', ['jquery', 'backbone', 'ApplicationView', 'ListCollection'], function($, Backbone, ApplicationView, ListCollection) {
    var Router = Backbone.Router.extend({
        initialize: function() {
            ListCollection.fetch({reset:true});

            this.application = new ApplicationView({collection: ListCollection});

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
            this.application.ListView.render(ListCollection.all());
        },
        remain: function() {
            if (!ListCollection.remain().length) {
                this.navigate('/', {trigger: true});
            } else {
                this.application.HeaderView.render('remain');
                this.application.ListView.render(ListCollection.remain());
            }
        },
        complete: function() {
            if (!ListCollection.complete().length) {
                this.navigate('/', {trigger: true});
            } else {
                this.application.HeaderView.render('complete');
                this.application.ListView.render(ListCollection.complete());
            }
        },
        defaultAction: function(action) {
            console.log('#404 - No route:', action);
            this.navigate('/', {trigger: true});
        }
    });

    return new Router;
});