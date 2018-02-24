(function(){
	const debug = process.env.NODE_ENV !== 'production';
	const webpack = require('webpack');

	module.exports = {
		//context: __dirname + '/client/src',
		devtool: debug ? "inline-sourcemap" : null,
		entry: __dirname + '/client/src/scripts.js',
		output: {
			path: __dirname + '/client/dist/build',
			filename: 'scripts.min.js'
		},
		module: {
			loaders: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['env']
					}
				},
				{
					test: /\.css?$/,
					loader: 'style-loader!css-loader'
				},
				{
					test: /\.html?$/,
				  loader: 'file-loader',
				  options: {
				    name: '../[name].[ext]'
				  }  
				}
			]
		},
		plugins: debug ? [] : [
			new webpack.optimize.UglifyJsPlugin()
		]
	};



})();