"use strict";

var _ =                 require("underscore");
var Deferred =          require("./Deferred");
var Promise =           require("bluebird");

var MCQParser = function(json){
    this.json = json;
};

MCQParser.prototype.parse = function(){
    var ques = this.json.questions.questionqroup, out = {"a":1};
    _.each(ques, function(q){
        console.log(decodeURI(q.question));
        console.log(q.answer);
        console.log(q.drawable);
    });
    return Promise.resolve(out);
};

module.exports = MCQParser;