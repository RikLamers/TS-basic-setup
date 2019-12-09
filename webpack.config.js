const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src')
};

module.exports = {
    entry: {
        main: ['./src/index.ts'],
        externals: ['./src/vendor.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: process.env.npm_lifecycle_event === 'build' ? '[name].[chunkhash:9].js' : '[name].[hash:9].js'
    },
    target: 'web',
    devtool: process.env.npm_lifecycle_event === 'build' ? '' : 'inline-source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: '[name].[contenthash:9]',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader?name=img/[hash:9]/[hash:9].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                                strip: true
                            },
                            gifsicle: {
                                interlaced: false,
                                optimizationLevel: 2
                            },
                            svgo: {

                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[hash:9]/[hash:9][name].[ext]'
                },
            }
        ]
    },
    devServer: {
        port: 3000,
        stats: {
            children: false,
            maxModules: 0
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:9].css'
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, {
                nodir: true
            })
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/views/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/views/about.html',
            filename: 'about.html'
        }),
        new ImageminWebpWebpackPlugin({
            config: [{
                test: /\.(jpe?g|png)/,
                options: {
                    exclude: 'favicon/',
                    quality:  90
                }
            }],
            overrideExtension: true
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/img/favicon.svg',
            inject: true,
            cache: true,
            outputPath: 'favicon/',
            prefix: './favicon/',
            inject: 'force',
            favicons: {
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    windows: false,
                    yandex: false
                }
            }
        
        }),
        new WebpackMd5Hash(),
        new RemovePlugin({
            after: {
                test: [
                    {
                        folder: process.env.npm_lifecycle_event === 'build' ? 'build/favicon' : '',
                        method: (filePath) => {
                            if (process.env.npm_lifecycle_event === 'build') {
                                return new RegExp(/\.webp$/, 'm').test(filePath);
                            }
                            return '';
                        }
                    }
                ]
            }
        })

    ]
};