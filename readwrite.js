var fs = require('fs');

var source = process.argv.splice(2)[0];
var target = source.substring(0, source.lastIndexOf('.')) + '.css';

fs.readFile(source, 'utf-8', function(error, data) {
    if (error) throw error;

    var analyse = function (input) {
        return input.map(function (line) {
            if (line.trimLeft() === '')
                return {l: '', r: ''}
            else
                return {
                    l: line.replace(line.trimLeft(), ''),
                    r: line.trimLeft()
                };
        });
    };

    var transform = function (lines) {
        var bracketFound = false;

        return lines.map(function (line) {
            if (line.l) {
                return line.l + line.r + ';';
            } else if (line.r) {
                bracketFound = true;
                return line.r + ' {'
            } else if (bracketFound) {
                bracketFound = false;
                return '}';
            }
        });
    }

    var output = transform(analyse(data.split('\n'))).join('\n')

    fs.writeFile(target, output, function(error) {
        if (error) throw error;
        console.log('Wrote to ' + target);
    })
});
