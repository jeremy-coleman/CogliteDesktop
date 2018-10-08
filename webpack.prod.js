const isProduction = process.env.NODE_ENV === "production";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const GeneratorPlugin = require("./webpack.plugins").GeneratorPlugin;
const WriteFilePlugin = require("write-file-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackShellPlugin = require('./tools/plugins/webpack-shell-plugin');
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const TsConfigPathsPlugin = require('ts-config-webpack-plugin')

const nodeExternals = require('webpack-node-externals')
const BundleAnalzyer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const contains = (...values) => {
//     return (filename) => {
//         return values.some(value => {
//             return filename.indexOf(value) >= 0;
//         });
//     }
// };


const contains = (...values) => filename => values.some(value => filename.indexOf(value) >= 0)
const endsWith = (...extensions) => filename => extensions.some(ext => filename.endsWith(ext));
const isNodeModuleFile = contains("node_modules");

const some = (...p) => filename => p.some(e => e(filename));


// const endsWith = (...extensions) => {
//     return (filename) => {
//         return extensions.some(ext => {
//             return filename.endsWith(ext);
//         });
//     };
// };


const pkgInfo = require('./package.json')


const createConfig = (env) => {

    if(!env) {
        env = {};
    }


    // NOTE: this is the legacy path - will have to do some work to update it
    const publicPath = env && env.publicPath ? env.publicPath : "/";
    const defaultConfig = {
        basePath: publicPath,
        publicPath: publicPath,
        fabricFontBasePath: "", // Fabric appends /fonts/... 
        fabricIconBasePath: "/icons/fabric/",
        buildVersion: env.production ? "production" : "development",
        buildDate: new Date().toISOString()
    };
    const AppConfig = Object.assign({}, defaultConfig, env);

    const config = {
        externals: [nodeExternals()],
        mode: "production",
        entry: {
            main: ["./src/main.tsx"]
        },
        output: {
            filename: AppConfig.production ? "[name].[chunkhash].js" : "[name].js",
            path: path.join(__dirname, "dist"),
            publicPath: publicPath
        },
        externals: [
            {'./node_modules/jszip': 'jszip'}
        ],
        module: {
            rules: [
                {
                    test: endsWith(".ts", ".tsx"),
                    use: [
                        {loader: "ts-loader", options: {transpileOnly: true}}
                    ],
                    exclude: isNodeModuleFile
                },
                {
                    test: endsWith(".css"),
                    use: [
                        { loader: "@microsoft/loader-load-themed-styles" },
                        { loader: "css-loader" }
                    ]
                },
                {
                    test: endsWith(".scss"),
                    use: [
                        { loader: "@microsoft/loader-load-themed-styles" },
                        { loader: "css-loader" },
                        { 
                            loader: "sass-loader",
                            options: {
                                data: `$ms-font-cdn-path: "${AppConfig.fabricFontBasePath}";`
                            }
                        }
                    ]
                },
                {
                    test: endsWith(".woff", ".woff2", ".font.svg", ".ttf", ".eot"),
                    use: [
                        { loader: "file-loader" }
                    ]
                },
                {
                    test: endsWith(".png", ".jpg", ".gif"),
                    use: [
                        { loader: "file-loader" }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".js", ".tsx", ".ts"],
            modules: [
                path.resolve(__dirname, "src"), path.resolve(__dirname, "@coglite"), "node_modules"
            ],
            alias: {
                "package.json$": path.resolve(__dirname, "package.json")
            }
        },
        devtool: "source-map",
        devServer: {
            contentBase: "./dist",
            open: true,
            historyApiFallback: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Coglite",
                template: "src/index.html",
                baseHref: publicPath,
                AppConfig: AppConfig,
                chunks: ["main"],
                chunksSortMode: "none"
            }),
            new CopyWebpackPlugin([
                { from: 'report_templates', to: 'report_templates' },
                { from: "fonts", to: "fonts" },
                { from: `${path.dirname(require.resolve('@uifabric/icons'))}/../fonts`, to: "icons/fabric" }
            ]),
            new GeneratorPlugin({
                generator: () => {
                    return `window.AppConfig = ${JSON.stringify(AppConfig, null, "\t")};`
                },
                filename: "AppConfig.js"
            }),
            new WriteFilePlugin(),
            new webpack.DefinePlugin({'pkgInfo': JSON.stringify(pkgInfo)}),
            //new WebpackShellPlugin({onBuildEnd: {scripts: ['yarn tse']}}),
            new CleanWebpackPlugin('dist'),
            new TerserPlugin(),
            new BundleAnalzyer()
        ]
    };

    return config;
};

module.exports = createConfig;