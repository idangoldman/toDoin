define('HeaderView', ['underscore', 'backbone', 'Router', 'text!templates/header.html'], function(_, Backbone, Router, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.model = {
                complete: 0,
                remain: 0,
                all: 0
            };

            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'change', this.render);
        },
        template: _.template(Template),
        tagName: 'header',
        events: {
            'click .switch-view': 'switchView'
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
            this.model.complete = this.collection.complete().length;
            this.model.remain = this.collection.remain().length;
            this.model.all = this.collection.all().length;
            this.model.disabled = !(this.model.remain && this.model.complete);
        },
        render: function(filter) {
            this.updateStats();

            this.$el
                .empty()
                .append(this.template(this.model));

            this.$('.switch-view')
                .toggleClass('remain', filter === 'remain' && this.model.remain)
                .toggleClass('complete', filter === 'complete' && this.model.complete);

            return this;
        }
    });
});