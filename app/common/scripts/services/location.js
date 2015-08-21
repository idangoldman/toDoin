var RSVP = require('rsvp');

function get_location() {
    return new RSVP.Promise(function(resolve, reject) {
        if ("geolocation" in navigator) {
            var options = {
                maximumAge: 30000,
                timeout: 27000
            };
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                function error(position_error) {
                    var message = null;

                    switch(position_error.code) {
                        case 1:
                            message = 'PERMISSION_DENIED';
                        break;
                        case 2:
                            message = 'POSITION_UNAVAILABLE';
                        break;
                        case 3:
                            message = 'TIMEOUT';
                        break;
                        default:
                            message = 'UNKNOWN';
                        break;
                    }

                    reject(message);
                },
                options);
        } else {
            reject('not cool man...');
        }
    });
}

module.exports = get_location;