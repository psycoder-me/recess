module.exports = function (lines) {
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
