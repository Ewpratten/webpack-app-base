const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack.dev.js');

const app = express();
app.use(express.static('public'));

app.get('/api', (req, res) => {
    return res.send({ "success": true, "message": "api index" });
});


if (process.env.NODE_ENV === 'development') {
    // Setup Webpack for development
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
} else {
    // Static serve the dist/ folder in production
    app.use(express.static('dist'));
}

// Listen on port
let port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);
