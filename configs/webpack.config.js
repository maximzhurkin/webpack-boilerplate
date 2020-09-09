// Основной конфиг сборки (от него наследуются development и production)

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const paths = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist')
}

getEntry = function (rule) {
	var result = {};
	var paths = glob.sync(rule);

	paths.forEach(function (path) {
		var filename = path.split('/').slice(-1)[0];
		var entry = filename.split('.').slice(0, -1).join('.');

		result[entry] = path;
	});
	return result;
}

let pluginsOptions = [];

Object.keys(getEntry(paths.src + '/pages/**/*.pug')).forEach(page => {
	pluginsOptions.push(
		new HtmlWebpackPlugin({
			title: 'Index',
			template: paths.src + '/pages/' + page + '/' + page + '.pug',
			filename: './' + page + '.html',
			chunks: [page],
			inject: 'body',
			minify: false
		})
	);
});

module.exports = {
	entry: getEntry(paths.src + '/pages/**/*.js'),
	output: {
		path: paths.dist,
		filename: 'assets/js/[name].bundle.js',
		chunkFilename: 'assets/js/[name].chunk.js',
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: {
					chunks: 'all',
					test: /node_modules/
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: [
					"raw-loader",
					"pug-html-loader?pretty=true"
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/images/[name].[ext]'
				}
			},
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		...pluginsOptions,
		new HtmlWebpackPugPlugin(),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].bundle.css',
			chunkFilename: 'assets/css/[name].chunk.css'
		}),
	]
}