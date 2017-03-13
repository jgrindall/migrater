var path = 				require('path');
var fs = 				require("fs");
var XML = 				require('simple-xml');
var _ = 				require("underscore");
var ParserFactory = 	require("./ParserFactory");

var files = JSON.parse(fs.readFileSync(process.argv[2] || 'files.json', 'utf8'));

var EXTENSION = 		".2diy";
var NEW_EXTENSION = 	".2quiz";

var getNewPath = function(url){
	var ext = path.extname(url);
	if(ext === EXTENSION){
		return url.substring(0, url.length - EXTENSION.length) + ".2quiz";
	}
};

_.each(files, function(url){
	var str, json, newPath, ext;
	str = fs.readFileSync(url, 'utf8');
	newPath = getNewPath(url);
	json = XML.parse(str);
	ParserFactory.parse(json)
	.then(function(out){
		fs.writeFileSync(newPath, JSON.stringify(out, null, 2), 'utf8');
	});
});