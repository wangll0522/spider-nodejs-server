var express = require('express');
var router = express.Router();
var spiderService = require("../service/http/spider-serivce");
var config = require("../spider.config");
var pathUtil = require("../utils/path-util");

/* GET users listing. */
start();

function createRouter(path, url, param) {

    router.get("/" + path, function(req, res, next) {
        var params = pathUtil.extend({}, param, req.query, req.params);
        spiderService.fetchGet(url, function(data) {
            res.json(data);
        }, params);
    });
}

function htmlRouter(path, url, param, filter, options) {
    router.get("/" + path, function(req, res, next) {
        var params = pathUtil.extend({}, param, req.query, req.params);
        spiderService.fetchHtml(url, function(data) {
            res.json(data);
        }, params, filter, options);
    });
}
function start() {
    var pathArr = pathUtil.jsonToPath(config.proxy);
    for (var key in pathArr) {
        createRouter(pathArr[key].key, pathArr[key].value, pathArr[key].param);
    }

    var pathArr = config.html;
    for (var key in pathArr) {
        htmlRouter(key, pathArr[key].url, pathUtil.getParams(pathArr[key].url).param, pathArr[key].filter, pathArr[key].options);
    }
}

router.reStart = start;

module.exports = router;
