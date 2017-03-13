"use strict";

var MCQParser =     require("./MCQParser");
var _ =             require("underscore");

var ParserFactory = function(){
    //
};

ParserFactory.parse = function(json){
    var type = _.keys(json)[0];
    if(type === "MultiChoice"){
        return new MCQParser(json[type]).parse();
    }
}

module.exports = ParserFactory;