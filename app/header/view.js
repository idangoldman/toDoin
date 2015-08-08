var Backbone = require('backbone'),
    _ = require('underscore'),
    Template = require('./template.html');

module.exports = Backbone.View.extend({
    tagName: 'header',
    template: Template,
    model: {
        sortMenu: [{
            name: 'complete',
            link: '/sort-by/complete',
            title: 'Sort by complete',
            selected: false
        },
        {
            name: 'date',
            link: '/sort-by/created_at',
            title: 'Sort by date',
            selected: false
        }],
        version: '1.5.3'
    },
    initialize: function() {
        this.render(this.model);

        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'change', this.render);
        Backbone.history.on('route', this.render, this);
    },
    events: {
        'click .sort-by a': 'navigate'
    },
    navigate: function(event) {
        Backbone.history.navigate(event.target.pathname, {trigger: true});
        event.preventDefault();
    },
    filterSortMenu: function(sortMenu) {
        return _.map(sortMenu, function(item) {
            item.selected = item.link === window.location.pathname;

            return item;
        });
    },
    render: function() {
         this.model.sortMenu = this.filterSortMenu(this.model.sortMenu);

        this.$el
            .empty()
            .append(this.template(this.model));

        return this;
    }
});