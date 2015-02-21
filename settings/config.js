var packageJSON = require('../package.json'),
    config = {
        title: 'ToDoin',
        version: packageJSON.version,
        path: {
            app: __dirname + '/../app',
            assets: __dirname + '/../assets',
            build: __dirname + '/../_build',
            chrome: __dirname + '/../assets/chrome',
            dist: __dirname + '/../_dist',
            fonts: __dirname + '/../assets/fonts',
            images: __dirname + '/../assets/images',
            root: __dirname + '/..'
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

module.exports = config;