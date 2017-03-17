"use strict";
var atob = 				require("atob");
var path = 				require('path');
var fs = 				require("fs");
var _ = 				require("underscore");

var BASE_64_PNG = 		"data:image/png;base64,";
var BASE_64_GIF =	 	"data:image/gif;base64,";
var BASE_64_JPG = 		"data:image/jpeg;base64,";
var EXTENSION = 		".2diy";
var NEW_EXTENSION = 	".2quiz";

var Utils = {
	getBase64:function(s){
		var decoded;
		if(!s){
			return null;
		}
		if(s.substring(0, BASE_64_PNG.length) === BASE_64_PNG || s.substring(0, BASE_64_GIF.length) === BASE_64_GIF || s.substring(0, BASE_64_JPG.length) === BASE_64_JPG){
			return s;
		}
		try{
			decoded = atob(s);
			if(decoded.substring(1, 4).toUpperCase() === "PNG"){
				return BASE_64_PNG + s;
			}
			else if(decoded.substring(0, 3).toUpperCase() === "GIF"){
				return BASE_64_GIF + s;
			}
			else{
				// no error thrown, probably jpg
				return BASE_64_JPG + s;
			}
		}
		catch(e){
			// decoding failed!!?? Not base 64 at all??
			return s;
		}
		// I think almost all of them are png, default to that if all else fails
		return BASE_64_PNG + s;
	},
	arrayify:function(a){
		return _.isArray(a) ? a : [a];
	},
	isCorrectExtension:function(file){
		return path.extname(file.name) === EXTENSION;
	},
	getNewPath: function(file){
		var url = file.name;
		if(path.extname(url) === EXTENSION){
			return url.substring(0, url.length - EXTENSION.length) + NEW_EXTENSION;
		}
		return url;
	}
};

Utils.getNewPaths = _.partial(_.map, _, Utils.getNewPath);

module.exports = Utils;


