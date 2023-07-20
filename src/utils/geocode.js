const request = require('request');


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiamF5ZGVlcDEyMyIsImEiOiJjbGs2b25pNTYwMHliM2dyb21tbG5yc3poIn0.fehJanMybsCRDqMlVYQCZA&limit=5';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (!body.features.length) {
            callback({error:'Unable to search location, Try another search.'}, undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;