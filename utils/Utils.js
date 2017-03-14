"use strict";

var BASE_64 = "data:image/png;base64,";

//TODO - this doesn't handle anything like /images/clipart etc.  or http://www.imagesearch.stuff

var Utils = {
	getBase64:function(s){
		if(!s){
			return null;
		}
		if(s.substring(0, BASE_64.length) === BASE_64){
			return s;
		}
		return BASE_64 + s;
	}
};
module.exports = Utils;