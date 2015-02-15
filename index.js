#!/usr/bin/env node
var fs = require('fs');
var recess = require('./recess')

var source = process.argv.splice(2)[0];
var target = source.substring(0, source.lastIndexOf('.')) + '.css';

fs.readFile(source, 'utf-8', function (error, data) {
    if (error) throw error;

    data = recess.analyse(data.split('\n'))
    data = recess.parse(data);
    recess.printParseTree(data);

    fs.writeFile(target, data, function (error){
        if (error) throw error;
    });
});
