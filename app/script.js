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
            isMobile: function() {
                return !!(navigator.userAgent.toLocaleLowerCase().match(/(android|webos|iphone|ipad|ipod|blackberry|windows phone)/));
            },
            render: function(elements) {
                //  Mobile hack for now
                $('body').toggleClass('mobile', this.isMobile());

                this.$el
                    .empty()
                    .append(elements).appendTo('body');

                return this;
            }
        });
    }
);

require(['Router']);