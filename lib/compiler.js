'use strict';

var utils = require('./utils');

var compiler = function (tree) {
    var lines = [];

    tree.forEach(function (element) {
        lines = lines.concat(serialize(element));
    });

    return lines;
};

var serialize = function (tree, parent_rule) {
    var rule = (parent_rule ?
                parent_rule + (tree.isPseudo ? '' : ' ') :
                '') + tree.left;

    var properties = [];
    var subRules = [];

    tree.children.forEach(function (element) {
        if (element.children.length === 0)
            properties.push('  ' + element.left + ': ' + element.right + ';')
        else {
            var next_parent_rule = rule;
            subRules = subRules.concat(serialize(element, next_parent_rule));
        }
    });

    properties.splice(0, 0, rule + ' {');
    properties.splice(properties.length, 0, '}');
    properties = properties.concat(subRules);

    return properties;
};

module.exports = compiler;
