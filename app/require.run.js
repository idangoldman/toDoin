requirejs.config({
    paths: {
        {% for file in assets.javascript.require.files %}
            "{{ loop.key }}": "{{ file }}"{% if !loop.last %},{% endif %}
        {% endfor %}
    }
});

require(['ToDoin'], function(ToDoin) {
    new ToDoin;
});