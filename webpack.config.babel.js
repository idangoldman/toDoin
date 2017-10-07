const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require('path');

import INFO from './info';


module.exports = {
    devtool: 'source-map',
    watch: true,

    entry: {
        popup: path.resolve( __dirname, 'src/index.jsx')
        // inject: path.resolve( __dirname, 'src/inject.js' ),
        // background: path.resolve( __dirname, 'src/background.js' ),
    },
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: '[name].js',
        publicPath: '/'
    },

    resolve: {
        extensions: [ '.html', '.svg', '.js', '.jsx', '.json' ],
        alias: {
            common: path.resolve( __dirname + '/src/common' ),
            root: path.resolve( __dirname ),
            src: path.resolve( __dirname + '/src' )
        }
    },

    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(woff2?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                options: {
                    publicPath: 'fonts/'
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    runtimeCompat: true
                }
            }
        ]
    },

    plugins: [
        // new ChromeExtensionReloader(),

        new CopyWebpackPlugin([{
            from: path.resolve( __dirname + '/chrome/' ),
            to: path.resolve( __dirname + '/dist/' )
        }]),

        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),

        new HtmlWebpackPlugin({
            title: INFO.name + ' ' + INFO.version,
            filename: path.resolve( __dirname + '/dist/popup.html' ),
            hash: true,
            showErrors: true,
            template: path.resolve( __dirname + '/src/popup.html' ),
            xhtml: true
        })
    ]
};
