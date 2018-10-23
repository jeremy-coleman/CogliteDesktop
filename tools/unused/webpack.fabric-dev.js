const isProduction = process.env.NODE_ENV === "production";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const GeneratorPlugin = require("./webpack.plugins").GeneratorPlugin;
const WriteFilePlugin = require("write-file-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackShellPlugin = require('./tools/plugins/webpack-shell-plugin');
const webpack = require('webpack')



const contains = (...values) => filename => values.some(value => filename.indexOf(value) >= 0)
const endsWith = (...extensions) => filename => extensions.some(ext => filename.endsWith(ext));
const isNodeModuleFile = contains("node_modules");

const some = (...p) => filename => p.some(e => e(filename));


const pkgInfo = require('./package.json')

const createConfig = (env) => {

    if(!env) {
        env = {};
    }


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
        mode: AppConfig.production ? "production" : "development",
        entry: {
            main: ["./src/client/main.tsx"]
        },
        output: {
            filename: AppConfig.production ? "[name].[chunkhash].js" : "[name].js",
            path: path.join(__dirname, "dist", "client"),
            publicPath: publicPath
        },
        externals: [
            {'./node_modules/jszip': 'jszip'}
        ],
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: endsWith(".ts", ".tsx"),
                    loader: "source-map-loader",
                    exclude: some(isNodeModuleFile, endsWith(".template.ts"))
                },
                {
                    enforce: "pre",
                    test: endsWith(".ts", ".tsx"),
                    use: [
                        //{loader: "babel-loader"}
                        {loader: "ts-loader", options: {transpileOnly: true}}
                    ],
                    exclude: isNodeModuleFile
                },
                {
                    test: endsWith(".js", ".jsx"),
                    use: [
                        {loader: "babel-loader"}
                        //{loader: "ts-loader", options: {transpileOnly: true}}
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
                path.resolve(__dirname, "src"), path.resolve(__dirname, "src/client"), path.resolve(__dirname, "src/@coglite"), "node_modules"
            ],
            alias: {
                "package.json$": path.resolve(__dirname, "package.json")
            }
        },
        
        devtool: "source-map",
        
        devServer: {
            contentBase: "./dist/client",
            open: true,
            historyApiFallback: true
        },
        
        plugins: [
            
            new HtmlWebpackPlugin({
                title: "Coglite",
                template: "src/client/index.html",
                baseHref: publicPath,
                AppConfig: AppConfig,
                chunks: ["main"],
                chunksSortMode: "none"
            }),

            new CopyWebpackPlugin([
                //{ from: 'report_templates', to: 'report_templates' },
                //{ from: "fonts", to: "fonts" },
                //{ from: `${path.dirname(require.resolve('@uifabric/icons'))}/../fonts`, to: "icons/fabric" }
            ]),
            new GeneratorPlugin({
                generator: () => {
                    return `window.AppConfig = ${JSON.stringify(AppConfig, null, "\t")};`
                },
                filename: "AppConfig.js"
            }),
            new WriteFilePlugin(),
            new webpack.DefinePlugin({'pkgInfo': JSON.stringify(pkgInfo)}),
            //new WebpackShellPlugin({onBuildEnd: {scripts: ['npm run tse']}}),
            new CleanWebpackPlugin('dist')
        ]
    };

    return config;
};

module.exports = createConfig;