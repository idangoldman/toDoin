var _ = require('underscore'),
    Backbone = require('backbone'),
    pubSub = _.extend({}, Backbone.Events);

// until the new Vent will kickin...
module.exports = pubSub;


// var list = {};

// module.exports = {
//     off: off,
//     on: on,
//     trigger: trigger
// };

// function off(component, action, callback) {
//     var index = null;

//     if ( list[component] ) {
//         if ( list[component][action] ) {
//             removeCallback(component, action, callback)
//         }

//         if ( list[component]['all'] ) {
//             removeCallback(component, 'all', callback);
//         }
//     }

//     if ( list['all'] && list['all'][action] ) {
//         removeCallback('all', action, callback);
//     }
// }

// function on(component, action, callback) {
//     component = component || 'all';
//     action = action || 'all';

//     list[component] || (list[component] = [])
//     list[component][action] || (list[component][action] = [])
//     list[component][action].push(callback);
// }

// function removeCallback(component, action, callback) {
//     var index = list[component][action].indexOf(callback);

//     if (index !== -1) {
//         list[component][action].splice(index, 1);
//     }
// }

// function trigger(component, action, message) {
//     if ( list[component] ) {
//         if ( list[component][action] ) {
//             triggerLoop(component, action, message);
//         }

//         if ( list[component]['all'] ) {
//             triggerLoop(component, 'all', message);
//         }
//     }

//     if ( list['all'] && list['all'][action] ) {
//         triggerLoop('all', action, message);
//     }
// }

// function triggerLoop(component, action, message)  {
//     var index = null;

//     for (index = list[component][action].length - 1;  index >= 0; index --) {
//         list[component][action][index](message);
//     }
// }