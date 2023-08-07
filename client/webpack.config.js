const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.

// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
    return {
        mode: "development",
        entry: {
            main: "./src/js/index.js",
            install: "./src/js/install.js"
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "/index.html"),
                chunks: ["main"],
            }),
            new WebpackPwaManifest({
                name: "textEdit_ifYouDare",
                short_name: "textEdit",
                description: "This is a text editor.",
                background_color: "#fff",
                theme_color: "#fff",
                icons: [
                    {
                        src: path.resolve("src/images/logo.png"),
                        sizes: ["48x48, 72x72, 96x96, 144x144, 168x168, 192x192, 256x256, 512x512"], // https://www.dozro.com/cyber/icon-sizes-for-progressive-web-apps-and-native-apps
                        destination: path.join("assets", "icons"),
                    }
                ]
            }),
            new InjectManifest({
                swSrc: "./src-sw.js",
                swDest: "service-worker.js"
            })
        ],

        module: {
            rules: [
                // https://webdevetc.com/programming-tricks/javascript/webpack/guide-to-webpack-css-style-loader/
                {
                    test: /\.css$/, // I know regex at least
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        }
                    }
                }
            ],
        },
    };
};

console.log("HtmlWebpackPlugin Config:", new HtmlWebpackPlugin().options);