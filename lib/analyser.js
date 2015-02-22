'use strict';

module.exports = function (lines) {
    return lines.map(function (line, index) {
        var selectors = ':.#>*+~[';
        var part = line.trimLeft();

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
            isPseudo: isPseudo,
            line_number: index
        };
    }).filter(function (element) {
        return element.left || element.right;
    });
};
