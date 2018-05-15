const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let HtmlWebpack = [];
let entry = {};
let files = require('./filenames') || []; // 填写需要编译的js文件名
files.map(file => {
    let entryJS = file.name.replace('.js', '');
    entry[entryJS] = `./views/${file.name}`;
    let htmlConfig = {
        title: file.title || '伴鱼绘本',
        favicon: './images/logo.png',
        chunks: ['vue', entryJS],
        chunksSortMode: 'manual',
        inject: 'body',
        filename: path.resolve(__dirname, `./html/${entryJS}.html`),
        template: './index.ejs',
        minify: {//压缩HTML文件
            removeComments: true,    //移除HTML中的注释
            collapseWhitespace: true    //删除空白符与换行符
        }
    };
    HtmlWebpack.push(new HtmlWebpackPlugin(htmlConfig));

});
const config = {
    mode: 'development',
    entry: {
        'vue': ['vue'],
        ...entry
    },
    output: {
        path: path.resolve('../land'),
        filename: '[name].js',
        chunkFilename: '[name].[id].chunk.js',
        publicPath: '../land/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                enforce: 'pre',
                exclude: [/node_modules/],
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                },

            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        // ...
                        postcss: [require('precss'),
                            require('autoprefixer')({browsers: ['last 2 versions', 'iOS 7']})]
                    }
                },
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: '[name].[hash:8].[ext]'
                    }
                }

            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: '[name].[hash:8].[ext]'

                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modules: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            modules: false
                        }
                    }
                ]


            }
        ]
    },
    optimization: {
        splitChunks: {
            minSize: 30000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {

                vue: {
                    test: 'vue',
                    name: "vue",
                    chunks: 'initial'
                }


            }
        }

    },

    plugins: [
        new CleanWebpackPlugin(['../land', '../html']),
        ...HtmlWebpack
    ],
    devtool: '#eval-source-map'
};

module.exports = (env = 'dev') => {
    if (env === 'production' || env === 'stage' || env === 'test') {
        console.log('------->', env);
        config.devtool = '';
        config.mode = 'production';
        config.output.filename = `[name].[chunkhash:8].js`;
        config.output.chunkFilename = `[name].[chunkhash:8].js`;
        config.plugins = (config.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    'ipalfish': JSON.stringify(env)
                }
            }),
            new webpack.HashedModuleIdsPlugin({
                hashFunction: 'sha256',
                hashDigest: 'hex',
                hashDigestLength: 20
            })

        ]);
    }
    return config
};
