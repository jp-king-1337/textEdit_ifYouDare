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
                template: path.resolve(__dirname, "/src/index.html"),
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
                        sizes: [72, 96, 120, 128, 144, 152, 180, 192, 256, 384, 512], // https://stackoverflow.com/questions/48839338/which-icon-sizes-are-required-for-progressive-web-apps-pwa-as-of-q1-2018
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
