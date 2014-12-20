define('ApplicationView', ['jquery', 'underscore', 'backbone', 'HeaderView', 'ListView', 'AddView'],
    function($, _, Backbone, HeaderView, ListView, AddView) {
        return Backbone.View.extend({
            'id': 'ToDoin',
            initialize: function() {
                var elements = {
                    HeaderView : HeaderView,
                    ListView   : ListView,
                    AddView    : AddView
                };

                this.render(_.map(elements, function(element, elementName) {
                    return ( this[elementName] = new element({collection: this.collection}) ).el;
                }, this));
            },
            render: function(elements) {
                this.$el.empty().append(elements).appendTo('body');

                return this;
            }
        });
    }
);

require(['Router']);