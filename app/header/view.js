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
        version: '2.2.0'
    },
    events: {
        'click .sort-by': 'open',
        'click .sort-by a': 'navigate'
    },
    initialize: function() {
        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'change', this.render);
        Backbone.history.on('route', this.render, this);
    },
    open: function(event) {
        this.$el.find('.sort-by').toggleClass('open');
        event.preventDefault();
    },
    navigate: function(event) {
        var newPathname = event.target.pathname.slice(1),
            oldPathname = Backbone.history.getFragment();

        if (newPathname === oldPathname) {
            newPathname = '';
        }

        Backbone.history.navigate(newPathname, { trigger: true });
        this.$el.find('.sort-by').removeClass('open');

        event.stopPropagation();
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