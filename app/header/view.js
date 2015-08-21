var Backbone = require('backbone'),
    _ = require('underscore'),
    Template = require('./template.html'),
    weather = require('../common/scripts/services/weather');

module.exports = Backbone.View.extend({
    tagName: 'header',
    template: Template,
    model: {
        weatherTempature: Math.floor(Math.random() * 100),
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
        version: '2.0.0'
    },
    initialize: function() {
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
    getWeather: function() {
        var that = this;
        weather().then(function(data) {
            that.$el.find('.weather').html(Math.ceil(data.temperature));
        });
    },
    render: function() {
        this.model.sortMenu = this.filterSortMenu(this.model.sortMenu);

        this.$el
            .empty()
            .append(this.template(this.model));

        this.getWeather();

        return this;
    }
});