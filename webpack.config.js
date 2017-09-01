const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require('path');


module.exports = {
    devtool: 'eval',

    entry: {
        popup: path.resolve( __dirname, 'src/index.jsx')
        // inject: path.resolve( __dirname, 'src/inject.js' ),
        // background: path.resolve( __dirname, 'src/background.js' ),
    },
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: '[name].js',
    },

    resolve: {
        extensions: [ '.svg', '.js', '.jsx', '.json' ],
        alias: {
            src: path.resolve( __dirname + '/src' )
        }
    },

    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test   : /\.(woff(2)?)(\?[a-z0-9]+)?$/,
                loader : 'file-loader'
            }
        ]
    },

    plugins: [
        new ChromeExtensionReloader(),

        new CopyWebpackPlugin([{
            from: path.resolve( __dirname + '/chrome/' ),
            to: path.resolve( __dirname + '/dist/' )
        }]),

        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: true,
            showErrors: false,
            template: './index.html',
            xhtml: true
        })
    ]
};
