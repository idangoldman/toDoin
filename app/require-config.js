requirejs.config({
    paths: {
        {% for file in assets.javascript.require.files %}
            "{{ loop.key }}": "{{ file }}"{% if !loop.last %},{% endif %}
        {% endfor %}
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});