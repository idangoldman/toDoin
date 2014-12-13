define('ToDoin', ['jquery', 'underscore', 'backbone', 'Router', 'ListCollection', 'HeaderView', 'ListView', 'AddView'],
    function($, _, Backbone, Router, ListCollection, HeaderView, ListView, AddView) {
        return Backbone.View.extend({
            initialize: function() {
                var that = this;

                ListCollection.fetch({reset:true});

                this.HeaderView = new HeaderView({collection: ListCollection});
                this.ListView = new ListView({collection: ListCollection});
                this.AddView = new AddView({collection: ListCollection});

                Router.on('route', function(action) {
                    var collection = [];

                    switch(action) {
                        case 'complete':
                            collection = ListCollection.complete();
                        break;
                        case 'remain':
                            collection = ListCollection.remain();
                        break;
                        case 'home':
                            collection = ListCollection.all();
                        break;
                    }

                    that.ListView.render(collection);
                });

                Backbone.history.start({pushState: true, hashChange: false});

                $('body').prepend(this.render().el);
            },
            attributes: function() {
                return {
                    'id': 'ToDoin'
                };
            },
            render: function() {
                var elements = ['HeaderView', 'ListView', 'AddView'],
                    that = this;

                that.$el.empty();
                _.each(elements, function(element) {
                    that.$el.append(that[element].$el);
                });

                return that;
            }
        });
    }
);

require(['ToDoin'], function(ToDoin) {
    window.todoin = new ToDoin();
});