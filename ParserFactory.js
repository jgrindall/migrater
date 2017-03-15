"use strict";

var MCQParser =     require("./types/mcq/MCQParser");
var _ =             require("underscore");

var ParserFactory = function(){
    //
};

ParserFactory.parse = function(json, options){
    var type = _.keys(json)[0];
    if(type === "MultiChoice"){
        return new MCQParser(json[type], options).parse();
    }
}

module.exports = ParserFactory;