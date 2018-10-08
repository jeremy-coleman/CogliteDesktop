const RawSource = require("webpack-sources").RawSource;

function GeneratorPlugin(options) {
    this._generator = options.generator;
    this._filename = options.filename;
}
GeneratorPlugin.prototype.apply = function(compiler) {
    const generator = this._generator;
    const filename = this._filename;
    compiler.plugin("emit", function(compilation, callback) {
        const generatorOptions = {
            compilation: compilation,
            webpack: compilation.getStats().toJson(),
            webpackConfig: compilation.options,
            filename: this._filename
        };
        compilation.assets[filename] = new RawSource(generator(generatorOptions));
        callback();
    });
};

module.exports = {
    GeneratorPlugin
};