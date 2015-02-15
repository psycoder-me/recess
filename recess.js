var analyse = function (lines) {
    return lines.map(function (line) {
        var part = line.trimLeft();
        var selectors = ':.#>*+~[';
        if (selectors.indexOf(part[0]) !== -1) {
            var left = part.trim(),
                right = '',
                isPseudo = true;
        } else {
            var left = (part.split(':')[0] || '').trim()
                right = (part.split(':')[1] || '').trim(),
                isPseudo = false;
        }

        return {
            indent: line.replace(part, '').length,
            left: left,
            right: right,
            isPseudo: part[0] === ':'
        };
    }).filter(function (element) {
        return element.left || element.right;
    });
};

var parse = function (lines) {
    var parents = [];

    return lines.map(function (line) {
        line.children = [];
        var parent = parents[parents.length - 1] || { indent: 0 };

        if (parent.indent == line.indent) {
            parents.pop();
            parent = parents[parents.length - 1] || { indent: 0 };
        }
        line.parent = parent;

        if (line.indent === 0) {
            parents = [line];
            line.parent = null;
            return line;
        } else if (parent.indent < line.indent) {
            parents.push(line);
            parent.children.push(line);
            return null;
        }
    }).filter(function (line) {
        return line;
    });

}

function indent (i) {
    return Array(i).join(' ');
}

var printParseTree = function (tree, i) {
    i = i || 0;
    tree.forEach(function (e) {
        console.log(indent(e.indent) + e.left + (e.right ? ': ' : '') + e.right);
        printParseTree(e.children, i + 1);
    });
}

var compile = function (tree) {

};

exports.analyse = analyse;
exports.parse = parse;
exports.printParseTree = printParseTree;
exports.compile = compile;
