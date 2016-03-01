var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    isMobile = require('./common/scripts/is-mobile'),
    HeaderView = require('./header/view'),
    TodosView = require('./todos/view'),
    CleanButtonView = require('./clean-button/view'),
    TypingView = require('./typing/view');

    Backbone.$ = $;

module.exports = Backbone.View.extend({
    id: 'ToDoin',
    initialize: function() {
        var elements = {
            HeaderView: HeaderView,
            TodosView: TodosView,
            CleanButtonView: CleanButtonView,
            TypingView: TypingView
        };

        this.render(
            _.map(elements, (element, elementName) => {
                return ( this[elementName] = new element({ collection: this.collection }) ).el;
            },
        this));
    },
    render: function(elements) {
        this.$el
            .append(elements)
                .appendTo('body')
            .end()
            .parent('body')
                .toggleClass('mobile', isMobile());

        return this;
    }
});