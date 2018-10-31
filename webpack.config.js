const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, "/public"),
        filename: "index_bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|woff(2)?|ttf|eot|svg)$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./client/index.html" })
    ],
    devServer: { 
        historyApiFallback: true 
        }
}

// var webpack = require('webpack');

// module.exports = {
//     entry: "./client/index.js",
//     output: {
//         path: __dirname + '/public/',
//         //publicPath: "build/",
//         filename: "index_bundle.js"
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 loader: "babel",
//                 exclude: [/node_modules/, /public/]
//             },
//             {
//                 test: /\.css$/,
//                 loader: "style-loader!css-loader!autoprefixer-loader",
//                 exclude: [/node_modules/, /public/]
//             },
//             {
//                 test: /\.less$/,
//                 loader: "style-loader!css-loader!autoprefixer-loader!less",
//                 exclude: [/node_modules/, /public/]
//             },
//             {
//                 test: /\.gif$/,
//                 loader: "url-loader?limit=10000&mimetype=image/gif"
//             },
//             {
//                 test: /\.jpg$/,
//                 loader: "url-loader?limit=10000&mimetype=image/jpg"
//             },
//             {
//                 test: /\.png$/,
//                 loader: "url-loader?limit=10000&mimetype=image/png"
//             },
//             {
//                 test: /\.svg/,
//                 loader: "url-loader?limit=26000&mimetype=image/svg+xml"
//             },
//             {
//                 test: /\.jsx$/,
//                 loader: "react-hot!babel",
//                 exclude: [/node_modules/, /public/]
//             },
//             {
//                 test: /\.json$/,
//                 loader: "json-loader"
//             }
//         ]
//     }
// }