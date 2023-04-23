const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/Assets", to: "Assets" },
                { from: "./index.html", to: "index.html" },
            ],
        }),
    ],
    mode: 'development',
    devtool: 'source-map'
};