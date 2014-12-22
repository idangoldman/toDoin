define('AppView', ['underscore', 'backbone', 'HeaderView', 'ListView', 'AddView'],
    function( _, Backbone, HeaderView, ListView, AddView) {
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
            isMobile: function() {
                return !!(navigator.userAgent.toLocaleLowerCase().match(/(android|webos|iphone|ipad|ipod|blackberry|windows phone)/));
            },
            render: function(elements) {
                this.$el
                    .append(elements)
                        .appendTo('body')
                    .end()
                    .parent('body')
                        .toggleClass('mobile', this.isMobile());

                return this;
            }
        });
    }
);

require(['PubSub', 'Router']);