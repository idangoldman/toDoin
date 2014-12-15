define('HeaderView', ['underscore', 'backbone', 'text!templates/header.html'], function(_, Backbone, Template) {
    return Backbone.View.extend({
        initialize: function() {
            this.model = {
                complete: 0,
                remain: 0,
                all: 0
            };
            this.render();

            this.collection.on('change', this.render, this);
        },
        template: _.template(Template),
        tagName: 'header',
        events: {
            'click .list-view': 'switchView'
        },
        switchView: function(event) {
            var modeDate = null;
            if (_.isNull(event.currentTarget.getAttribute('disabled'))) {
                modelData = this.$('.list-view').toggleClass('complete').is('.complete') ? 'complete' : 'remain';
                this.collection.trigger('switchView', modelData);
            }
            event.preventDefault();
        },
        render: function() {
            var modeFilter = this.collection.getModeFilter();

            if (this.collection.length) {
                this.model.complete = this.collection.complete().length;
                this.model.remain = this.collection.remain().length;
                this.model.all = this.collection.length;
            }

            this.$el.empty().append(this.template(this.model));

            this.$('.list-view')
                .toggleClass('remain', modeFilter === 'remain' && this.model.remain)
                .toggleClass('complete', modeFilter === 'complete' && this.model.complete);

            return this;
        }
    });
});