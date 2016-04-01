'use strict';

var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var rita = require('rita');

var Copia = function(props) {
	this.default_props = { adjective_chance: 65 };
	this.props = _.assignInWith({}, props, this.default_props , (o,s) => { return _.isUndefined(o) ? s : o; });
	this.grammar = new rita.RiGrammar(yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../data/grammar.yml'))));
	
	this.adjectives = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../data/adjectives.yml')));
};

Copia.prototype.adjectivize = function(string) {
	var percentage, adjective;
	adjective = '';

	percentage =_.random(1, 100);
	if (percentage <= this.props.adjective_chance) {
		adjective = _.sample(this.adjectives.adjectives) + ' ';
	}

	return adjective + string;
}

Copia.prototype.pluralize = function(string) {
	return this.adjectivize(rita.RiTa.pluralize(string));
}

Copia.prototype.get_copia = function(number) {
	var _this = this;

	if (number === undefined) {
		number = 1;
	}
	return _.map(_.times(number, String), function (x) {
		x = _this.grammar.expand(_this); // Pass this to expand() so we have access to helper methods

		x = _.upperFirst(x);

		// We have to do this because RiTa's recursion is broken (so it can't evaluation `adjectivize(`a(animal)`)`:
		x = x.replace(/ a ([aeiou])/g, ' an $1');
		x = x.replace(/^A ([aeiou])/, 'An $1');

		// Fix subject object agreement:
		x = x.replace(/s was/, 's were');

		x = x.replace(/were ate/, 'were eaten');

		return x;
	});
}

exports['default'] = Copia;
module.exports = exports['default'];

