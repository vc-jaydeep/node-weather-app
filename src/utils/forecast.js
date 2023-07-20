const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2368f75ab54acb8bdd8c9a5f7bcf3dd3&query=' + latitude + ',' + longitude;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.error) {
            callback('Unable to find location, Try another search.', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast;