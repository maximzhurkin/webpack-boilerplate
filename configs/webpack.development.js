const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		overlay: true, // Показывать ошибки
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{ loader: 'stylus-loader' }
				]
			}
		]
	}
});