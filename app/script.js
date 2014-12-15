define('ToDoin', ['jquery', 'underscore', 'backbone', 'Router', 'ListCollection', 'HeaderView', 'ListView', 'AddView'],
    function($, _, Backbone, Router, ListCollection, HeaderView, ListView, AddView) {
        return Backbone.View.extend({
            'id': 'ToDoin',
            initialize: function() {
                var elements = {
                    HeaderView : HeaderView,
                    ListView   : ListView,
                    AddView    : AddView
                };

                ListCollection.fetch({reset:true});

                this.renderLayout(_.map(elements, function(element, elementName) {
                    return (this[elementName] = new element({collection: ListCollection})).el;
                }, this));

                Router.on('route', this.render, this);

                Backbone.history.start({pushState: true, hashChange: false});
            },
            render: function(action) {
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

                this.ListView.render(collection);
            },
            renderLayout: function(elements) {
                this.$el.empty().append(elements).appendTo('body');
                return this;
            }
        });
    }
);

require(['ToDoin'], function(ToDoin) {
    window.todoin = new ToDoin();
});