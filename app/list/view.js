define('ListView', ['underscore', 'backbone', 'ListItemView', 'text!templates/list.html'], function(_, Backbone, ListItemView, Template) {
    return Backbone.View.extend({
        tagName: 'section',
        className: 'tasks',
        template: _.template(Template),
        render: function(collection) {
            this.$el.empty().append(this.template);

            this.$('ul').append(_.map(collection, function(model) {
                return new ListItemView({model: model}).el;
            }));

            return this;
        }
    });
});