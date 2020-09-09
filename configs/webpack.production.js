const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new UglifyJsPlugin({
				uglifyOptions: {
					output: { comments: false },
					compress: { booleans: true, }
				}
			})
		],
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
					{ loader: 'postcss-loader' },
					{ loader: 'stylus-loader' }
				]
			}
		]
	}
});