const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

/**
 * @type {import('webpack').Configuration}
 */
const devConfig = {
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		compress: true,
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true,
	},
	target: 'web',
	plugins: [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
	devtool: 'eval-source-map',
};

module.exports = merge(commonConfig, devConfig);
