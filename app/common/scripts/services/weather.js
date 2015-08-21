var RSVP = require('rsvp');
var xhr = require('xhr');
var location = require('./location');

function fetch_weather(latitude, longitude, units) {
    // latitude = latitude || '32.066667';
    // longitude = longitude || '34.783333';
    units = units || 'metric'; // or 'imperial'.

    var app_id = 'db0d5a0bab46d4ac8c60f053ffbef6bf';
    var default_data = {
        city: 'NA',
        country: 'NA',
        temperature: Math.ceil(Math.random() * 100)
    };

    return new RSVP.Promise(function(resolve, reject) {
        location().then(function(position) {
            xhr({
                method: 'get',
                url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.latitude + '&lon=' + position.longitude + '&units=' + units + '&APPID=' + app_id
            }, function( err, resp, body ) {
                if (err) {
                    reject(default_data);
                } else {
                    var data = JSON.parse(body);

                    resolve({
                        city: data.name,
                        country: data.sys.county,
                        temperature: Math.ceil(data.main.temp)
                    });
                }
            });
        }).catch(function() {
            reject(default_data);
        });
    });
}

module.exports = fetch_weather;