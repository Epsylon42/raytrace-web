const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')

const mode = 'production';

const browserConfig = {
    mode,
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, "output")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: [
                    'vue-template-loader'
                ]
            },
            {
                test: /\.worker\.js$/,
                loader: 'worker-loader'
            },
            {
                test: /\.ron$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
};

const workerConfig = {
    mode,
    entry: './src/wasm-render.worker.js',
    target: 'webworker',
    devtool: 'source-map',
    output: {
        filename: 'wasm-render.worker.js',
        path: path.resolve(__dirname, 'output'),
    },
    plugins: [
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, 'raytrace'),
            extraArgs: '-- --features wasm'
        })
    ]
};

module.exports = [browserConfig, workerConfig];
