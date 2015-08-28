if (!("localStorage" in window)) {
    console.log('no local storage support.');
}

function get_item(key) {
    var value = window.localStorage.getItem(key);

    try {
        value = JSON.parse( value );
    } catch(exception) {}

    return value;
}

function set_item(key, value) {
    window.localStorage.setItem(key, JSON.stringify( value ) );

    return get_item(key);
}

function remove_item(key) {
    window.localStorage.removeItem(key);
}

module.exports = {
    get_item: get_item,
    set_item: set_item,
    remove_item: remove_item
};