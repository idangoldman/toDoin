define('HeaderView', ['underscore', 'backbone', 'Router', 'text!templates/header.html'], function(_, Backbone, Router, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.model = {
                complete: 0,
                remain: 0
            };

            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'add', this.render);
        },
        template: _.template(Template),
        tagName: 'header',
        events: {
            'click .check-box': 'switchView'
        },
        switchView: function(event) {
            if (!$(event.target).attr('disabled')) {
                switch(Backbone.history.location.pathname) {
                    case '/complete':
                        Backbone.history.navigate("/", {trigger: true});
                        break;
                    case '/remain':
                        Backbone.history.navigate("/complete", {trigger: true});
                        break;
                    case '/':
                        Backbone.history.navigate("/remain", {trigger: true});
                        break;
                }
            }

            event.preventDefault();
        },
        updateStats: function() {
            this.model.complete = this.collection.completeCount;
            this.model.remain = this.collection.remainCount;
            this.model.disabled = !(this.model.remain && this.model.complete);
        },
        render: function() {
            this.updateStats();

            this.$el
                .empty()
                .append(this.template(this.model));

            this.$('.check-box')
                .toggleClass('remain', Backbone.history.location.pathname === '/remain')
                .toggleClass('complete', Backbone.history.location.pathname === '/complete');

            return this;
        }
    });
});