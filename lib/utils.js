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

exports.printParseTree = printParseTree;
exports.indent = indent;
