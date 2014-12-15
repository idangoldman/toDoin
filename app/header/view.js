define('HeaderView', ['underscore', 'backbone', 'text!templates/header.html'], function(_, Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.model = {
                complete: 0,
                remain: 0,
                all: 0
            };
            this.render();

            this.collection.bind('change', this.render, this);
        },
        template: _.template(Template),
        tagName: 'header',
        events: {
            'click .list-view': 'switchView'
        },
        switchView: function(event) {
            var modeDate = null;
            if (_.isNull(event.currentTarget.getAttribute('disabled'))) {
                this.$el.find('.list-view').toggleClass('complete');
                modelData = this.$el.find('.list-view').is('.complete') ? 'complete' : 'remain';

                this.collection.trigger('switchView', modelData);
            }

            event.preventDefault();
        },
        render: function() {
            if (this.collection.length) {
                this.model.complete = this.collection.complete().length;
                this.model.remain = this.collection.remain().length;
                this.model.all = this.collection.length;
            }

            this.$el.empty();
            this.$el.html(this.template(this.model));

            if (this.collection.modeFilter === 'complete' && this.model.complete) {
                this.$el.find('.list-view').addClass('complete');
            } else if (this.collection.modeFilter === 'remain' && this.model.remain) {
                this.$el.find('.list-view').addClass('remain');
            }

            return this;
        }
    });
});