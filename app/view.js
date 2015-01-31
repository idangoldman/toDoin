var _ = require('underscore'),
    Backbone = require('backbone'),
    HeaderView = require('./header/view'),
    TasksView = require('./tasks/view'),
    TypingView = require('./typing/view');

module.exports = Backbone.View.extend({
    'id': 'ToDoin',
    initialize: function() {
        var elements = {
            HeaderView : HeaderView,
            TasksView : TasksView,
            TypingView : TypingView
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