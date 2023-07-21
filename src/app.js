const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express();

// Set up the view engine to use EJS templates.  This is a popular templating language that works well with Express and Node.js applications: https://ejs.co/ 

// console.log(__dirname); // dirname that contain the path of directory
// console.log(__filename); // filename that contain the current file 

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// Setup handlerbar and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Jaydeep Vala",
        description: 'Use this site to get your weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        shortContent: 'This is the About page of our website.',
        description: 'We are a team of dedicated professionals working towards delivering high-quality solutions.',
        name: 'jaydeep Vala'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jaydeep Vala'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address' });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error);
        }
        forecast(latitude, longitude, (error, { weather_descriptions, temperature, feelslike, humidity, wind_speed }) => {
            if (error) {
                return console.log('Error', error);
            }
            res.send({
                forecast: `${weather_descriptions[0]}, It is currently ${temperature} degree out. there is a ${feelslike}% chance of rain and wind speed ${wind_speed} KM/H, humidity count ${humidity}`,
                location,
                address: req.query.address,
                wind_speed,
                humidity
            });
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Jaydeep Vala'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404 page not found',
        name: 'Jaydeep Vala'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000');
})