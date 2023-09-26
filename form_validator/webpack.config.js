const path = require('path')
// load boostrap and jquery

module.exports = {
    entry: './assets/scripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'core', 'static')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
}
