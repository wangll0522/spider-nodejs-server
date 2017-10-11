var express = require('express');
var router = express.Router();
const glob = require('glob');
const app = require('express')();
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);

/* GET users listing. */
router.get('/reload/config/spider', function(req, res, next) {
    // try {
        glob.sync(ROOT_PATH + '/appserver.js',{debug: false}).forEach(function(file) {
            var instance = require(file);

            // 生成 URL 路径，去掉 .js 去掉 controllers
            var urlPath = file.replace(/\.[^.]*$/, '').replace('/routes', '');
            var method = "reStart";
            var handler = instance[method];
            app["use"]('/appserver/v1', instance);
        });
        res.json({reload:"sucess"});
    // } catch (e) {
    //     res.json({err: e});
    // }
});

module.exports = router;
