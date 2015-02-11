module.exports = {
    path: {
        app: __dirname + '/../app',
        build: __dirname + '/../_build',
        chrome: __dirname + '/../chrome',
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
    },
    layout: {
        title: 'ToDoin'
    }
};