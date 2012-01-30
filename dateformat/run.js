/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
var KISSY = require('kissy').KISSY;
var jasmine = require('jasmine-node');
console.log(KISSY.Config);
//load kissy module
KISSY.Config({
    packages: [
        {
            name: 'util',
            path: '../',
            charset: 'utf-8'
        }
    ]
});

KISSY.use('./dateformat', function(S, DateFormat) {
    console.log(KISSY.Util.DateFormat);
});


for(var key in jasmine) {
    global[key] = jasmine[key];
}

var isVerbose = true;
var showColors = true;

process.argv.forEach(function(arg){
    switch(arg) {
        case '--color': showColors = true; break;
        case '--noColor': showColors = false; break;
        case '--verbose': isVerbose = true; break;
    }
});

jasmine.executeSpecsInFolder(__dirname + '/', function(runner, log){
    if (runner.results().failedCount == 0) {
        process.exit(0);
    }
    else {
        process.exit(1);
    }
}, isVerbose, showColors, undefined, undefined, undefined, {});