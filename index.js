#!/usr/bin/env node
var fs = require('fs');
var precessr = require('./precessr')

var source = process.argv.splice(2)[0];
var target = source.substring(0, source.lastIndexOf('.')) + '.css';

fs.readFile(source, 'utf-8', function (error, data) {
    if (error) throw error;

    data = precessr.split(data.split('\n'))
    data = precessr.treefy(data);
    precessr.printTree(data);

    fs.writeFile(target, data, function (error){
        if (error) throw error;
    });
});
