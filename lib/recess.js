'use strict';

var fs = require('fs'),
    analyser = require('./analyser'),
    parser = require('./parser'),
    compiler = require('./compiler'),
    utils = require('./utils');

var source = process.argv.splice(2)[0];
var target = source.substring(0, source.lastIndexOf('.')) + '.css';

fs.readFile(source, 'utf-8', function (error, data) {
    if (error) throw error;

    data = analyser(data.split('\n'));
    data = parser(data);
    data = compiler(data);
    data = data.join('\n');

    fs.writeFile(target, data, function (error){
        if (error) throw error;
    });
});
