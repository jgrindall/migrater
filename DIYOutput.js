/* not stricty because of the weird octal thing */

var _ = 				require("underscore");
var AdmZip = 			require('adm-zip');
var fs = 				require("fs");

module.exports = {
	
	
	
	
	/* for web use */
	"output":function(res, newNames, jsonArray){
		console.log(jsonArray, newNames);
		if(newNames.length === 1){
			res.writeHead(200, {'content-type': 'application/force-download','Content-disposition':'attachment; filename=' + newNames[0]});
			res.write(JSON.stringify(jsonArray[0], null, 2));
			res.end();
		}
		else{
			var zip = new AdmZip();
			_.each(jsonArray, function(json, i){
				zip.addFile(newNames[i], new Buffer(JSON.stringify(jsonArray[i], null, 2)), "file " + i, 0400);
			});
			res.setHeader('Content-disposition', 'attachment; filename=quiz.zip');
			return res.send(200, zip.toBuffer());
		}
	},
	"error":function(res){
		console.log("ERRRO");
		res.writeHead(200, {'content-type': 'application/force-download','Content-disposition':'attachment; filename=error.txt'});
		res.write("no valid files");
		res.end();
	},
	
	
	
	/* for command line use */
	"write":function(newName, json){
		fs.writeFileSync(newName, JSON.stringify(json, null, 2), 'utf8');
	}
};









