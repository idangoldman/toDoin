var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
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
        version: '2.3.1'
    },
    events: {
        'click .sort-by': 'openSortBy',
        'click .sort-by a': 'navigate'
    },
    initialize: function() {
        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'change', this.render);
        Backbone.history.on('route', this.render, this);
        this.closeSortBy = this.closeSortBy.bind(this);
        $el = this.$el;
    },
    closeSortBy: function(event) {
        if(!$(event.target).closest('.sort-by').length && !$(event.target).is('.sort-by')) {
            if(this.$el.find('.sort-by').hasClass('open')) {
                this.$el.find('.sort-by').removeClass('open');
                $('body').off('click', this.closeSortBy);
            }
        }
    },
    openSortBy: function(event) {
        this.$el.find('.sort-by').toggleClass('open');
        $('body').on('click', this.closeSortBy);
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