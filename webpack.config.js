const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const fs = require('fs')



//? - =========================  LIQUUID  ========================= -//
//? - =========================  LIQUUID  ========================= -//


function generateLiquidPluginsViews(pathViews, pathIncludes) {
    let filesViews = fs.readdirSync(path.resolve(__dirname, pathViews))
    return filesViews.map(item => {
        let parts = item.split('.')
        let name = parts[0]
        return new HtmlWebpackPlugin({
            inject: false,
            filename: `./templates/page.${name}.liquid`,
            template: path.resolve(__dirname, `${pathViews}/${name}.pug`),
        })
    })
}

function generateLiquidPluginsIncludes(pathIncludes) {
    let filesIncludes = fs.readdirSync(path.resolve(__dirname, pathIncludes))
    return filesIncludes.map(item => {
        let parts = item.split('.')
        let name = parts[0]
        return new HtmlWebpackPlugin({
            inject: false,
            filename: `./snippets/${name}.liquid`,
            template: path.resolve(__dirname, `${pathIncludes}/${name}.pug`),
        })
    })
}

function generateLiquidPluginsMainly(pathMainly) {
    let filesMainly = fs.readdirSync(path.resolve(__dirname, pathMainly))
    return filesMainly.map(item => {
        let parts = item.split('.')
        let name = parts[0]
        return new HtmlWebpackPlugin({
            inject: false,
            filename: `./templates/${name}.liquid`,
            template: path.resolve(__dirname, `${pathMainly}/${name}.pug`),
        })
    })
}


function generateLiquidPluginsSections(pathSections) {
    let filesSections = fs.readdirSync(path.resolve(__dirname, pathSections))
    return filesSections.map(item => {
        let parts = item.split('.')
        let name = parts[0]
        return new HtmlWebpackPlugin({
            inject: false,
            filename: `./sections/${name}.liquid`,
            template: path.resolve(__dirname, `${pathSections}/${name}.pug`),
        })
    })
}


function generateLiquidPluginsCustomers(pathSections) {
    let filesSections = fs.readdirSync(path.resolve(__dirname, pathSections))
    return filesSections.map(item => {
        let parts = item.split('.')
        let name = parts[0]
        return new HtmlWebpackPlugin({
            inject: false,
            filename: `./templates/customers/${name}.liquid`,
            template: path.resolve(__dirname, `${pathSections}/${name}.pug`),
        })
    })
}
// Call our function on our views directory.
const liquidPluginsMainly = generateLiquidPluginsMainly('./src/pug/mainly')
const liquidPluginsViews = generateLiquidPluginsViews('./src/pug/views')
const liquidPluginsIncludes = generateLiquidPluginsIncludes('./src/pug/includes')
const liquidPluginsSections = generateLiquidPluginsSections('./src/pug/sections')
const liquidPluginsCustomers = generateLiquidPluginsCustomers('./src/pug/customers')

module.exports = {
    mode: 'development', //most important
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: './assets/app.bundle.js'
    },


    // ------------------  RULES
    // ------------------  RULES
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },

            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.pug$/,
                use: 'pug-loader',
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: true,
                        },
                    },
                ],
            },

            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },

            {
                test: /\.js$/,
                loader: "imports-loader?define=>false"
            }

        ]
    },

    // ------------------  DEV SERVER
    // ------------------  DEV SERVER
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        stats: 'errors-only',
        open: true
    },
    // ------------------  PLUGINS
    // ------------------  PLUGINS
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pug/mainly/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './src/pug/views/about.pug'
        }),



        new ExtractTextPlugin({ //important: use: npm i -D extract-text-webpack-plugin@next
            filename: './assets/app.css',
        }),
        new OptimizeCssnanoPlugin({
            cssnanoOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                }],
            },
        }),
        new WriteFilePlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ].concat(liquidPluginsViews).concat(liquidPluginsIncludes).concat(liquidPluginsMainly).concat(liquidPluginsSections).concat(liquidPluginsCustomers),



    resolve: {
    }
} //close module exports