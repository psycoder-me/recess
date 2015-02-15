var split = function (lines) {
    return lines.map(function (line) {
        var part = line.trimLeft();

        return {
            indent: line.replace(part, '').length,
            name: part,
            isPseudo: part[0] === ':'
        };
    }).filter(function (element) {
        return element.name;
    });
};

var treefy = function (lines) {
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

var printTree = function (tree, i) {
    i = i || 0;
    tree.forEach(function (e) {
        console.log(indent(e.indent) + e.name);
        printTree(e.children, i + 1);
    });
}

exports.split = split;
exports.treefy = treefy;
exports.printTree = printTree;
