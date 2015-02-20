var packageJSON = require('../package.json');

module.exports = {
    title: 'ToDoin',
    version: packageJSON.version,
    path: {
        root: __dirname + '/..',
        app: __dirname + '/../app',
        build: __dirname + '/../_build',
        chrome: __dirname + '/../chrome',
        dist: __dirname + '/../_dist',
        images: __dirname + '/../images'
    },
    assets: {
        stylesheet: {
            bower: [
                './bower_components/normalize-css/normalize.css'
            ],
            layout: [
                'vendors/css/normalize.css',
                'style.css'
            ]
        },
        javascript: {
            main: 'script.js'
        }
    },
    compass: {
        config_file: './config.rb',
        css: './css',
        sass: './app/'
    }
};