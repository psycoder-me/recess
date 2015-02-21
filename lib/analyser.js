module.exports = function (lines) {
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
