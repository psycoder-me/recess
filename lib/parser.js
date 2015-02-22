'use strict';

var errors = require('./errors');

module.exports = function (lines) {
    var parents = [];

    return lines.map(function (line) {
        line.children = [];

        if (line.indent === 0) {
            parents = [line];
            line.parent = null;
            return line;
        } else {
            var parent = findParent(parents, line);
            if (parent === null)
                throw new errors.SyntaxError("Indentation Error at line " + line.line_number);
            line.parent = parent;
            parent.children.push(line);
            parents.push(line);
            return null;
        }

    }).filter(function (line) {
        return line;
    });

}

function findParent (parents, line) {
    if (parents === null || parents.length == 0)
        return null;
    else {
        var parent = parents[parents.length - 1];
        if (parent.indent < line.indent)
            return parent;
        else {
            parents.pop();
            return findParent(parents, line);
        }
    }
    var parent = parents[parent.length - 1] || null;
}
