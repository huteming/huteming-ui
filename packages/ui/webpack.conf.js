const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const config = require('./config')

module.exports = {
    mode: 'production',
    entry: config.ui,
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        library: 'library',
        libraryTarget: 'commonjs2',
        // libraryExport: 'default',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
        modules: ['node_modules'],
    },
    performance: {
        hints: false
    },
    stats: 'none',
    optimization: {
        minimizer: [
            // css mini
            new OptimizeCSSPlugin({
                cssProcessorOptions: { safe: true },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                  limit: 10000,
                  name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name]/style.css',
            allChunks: true,
        }),
    ]
}
