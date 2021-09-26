const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

/**
 * @type {import('webpack').Configuration}
 */
const prodConfig = {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
};

module.exports = merge(commonConfig, prodConfig);
