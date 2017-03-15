"use strict";

var _ =                 require("underscore");
var Promise =           require("bluebird");
var MCQ_SKELETON =      require("./MCQSkeleton");
var Utils =      		require("../../utils/Utils");

var _getTimeForQuiz = function(timePerQuestion, numQuestions){
	var minutes = Math.max(5, numQuestions * parseInt(timePerQuestion));
	return 60 * minutes; // seconds
};

var MCQParser = function(json, options){
	this.skeleton = JSON.parse(JSON.stringify(MCQ_SKELETON));
    this.json = json;
	this.options = _.defaults(options || {}, {"timePerQuestion":"3"});
	this.clean();
};

MCQParser.prototype.clean = function(){
	delete this.json["bckgcolor"];
	delete this.json["settings"];
	delete this.json["targetscore"];
	delete this.json["soundsettings"];
	delete this.json["gameObjects"];
	delete this.json["recordedSounds"];
};

MCQParser.prototype.addQuestions = function(){
	var _this = this;
	this.skeleton.questions = [];
	_.each(this.json.questions.questionqroup, function(q, i){
		var numOptions = q.answer.length;
		var answers = q.answer.map( decodeURIComponent);
		var correctAnswer = answers[0];
		answers = _.shuffle(answers);
		_this.skeleton.questions.push({
			"config":{  
            "type":"mcq",
            "data":{  
               "choices":answers,
               "question": decodeURIComponent(q.question) || "Question",
               "correct":[  
                   correctAnswer
               ],
			   "thumbnail": Utils.getBase64(q.drawable)
            }
         },
         "questionId":"" + i
		});
	});
};

MCQParser.prototype.addOrder = function(){
	var numQuestions = this.json.questions.questionqroup.length;
	var edges = (numQuestions <= 1) ? [] : _.map(_.range(0, numQuestions - 1), function(i){return [""+i, "" + (i + 1)]});
	this.skeleton.order = {
		"start":"0",
		"edges":edges
	};
};

MCQParser.prototype.addSettings = function(){
	var timePerQuestion = this.options.timePerQuestion;
	var numQuestions = this.json.questions.questionqroup.length;
	this.skeleton.settings.introScreen.imageCache.main = this.skeleton.questions[0].config.data.thumbnail || "/images/2quiz/introscreen/ques.jpg";
	this.skeleton.settings.introScreen.title.contents = "TITLE GOES HERE";
	this.skeleton.settings.introScreen.text.contents = "TEXT GOES HERE";
	this.skeleton.settings.introScreen.timer.data.startTimeInSeconds = _getTimeForQuiz(timePerQuestion, numQuestions);
};

MCQParser.prototype.parse = function(){
	try{
		this.addQuestions();
		this.addOrder();
		this.addSettings();
		this.skeleton.creatorUserId = "1";
	}
	catch(e){
		console.log("error", e);
	}
    return Promise.resolve(this.skeleton);
};

module.exports = MCQParser;
