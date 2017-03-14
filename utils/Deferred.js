"use strict";

var Promise =           require("bluebird");

var Deferred = function(){
    var _this = this;
    this.promise = new Promise(function resolver(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
    });
};

module.exports = Deferred;