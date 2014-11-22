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
            'click .mode': 'modeSwitch'
        },
        modeSwitch: function(event) {
            var modeDate = null;
            if (_.isNull(event.currentTarget.getAttribute('disabled'))) {
                this.$el.find('.mode').toggleClass('complete');
                modeData = this.$el.find('.mode').is('.complete') ? 'complete' : 'remain';

                this.collection.trigger('modeSwitch', modeData);
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

            if (this.collection.modeFilter === 'complete' && !this.$el.find('.mode').hasClass('complete')) {
                this.$el.find('.mode').addClass('complete');
            }

            return this;
        }
    });
});