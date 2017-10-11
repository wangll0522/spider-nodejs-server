/**
 * Created by mac-pc on 2017/7/26.
 */
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var iconv = require('iconv-lite')
var request = require('request');
var config = require("../../spider.config");
var PathUtil = require("../../utils/path-util");
var url = config.url;
var static = config.static;

function fetchGet(path, loadFunc, requestData) {
    var pathParam = path.match(/:([a-z|A-Z|0-9])*/g);
    if (pathParam) {
        pathParam = pathParam.toString().replace(/:/g, "").split(",");
        for (var param in pathParam) {
            var replacePath = requestData[pathParam[param]];
            if (replacePath) {
                var regStr = new RegExp(":"+pathParam[param]);
                path = path.replace(regStr, replacePath)
            } else {
                loadFunc && loadFunc({err: "È±ÉÙ²ÎÊý£º"+ pathParam[param]});
                return;
            }
        }
    }

    request({
        url: url + path + PathUtil.parsePathParam(requestData),
        method: "GET",
        json: true,
        headers: {
            "content-type": "application/json"
        },

        form: requestData,
        body: JSON.stringify(requestData)
    }, function(error, response, body) {
        if (!error) {
            // body = iconv.decode(body, 'gb2312')
            // $ = cheerio.load(body);
            try {
                if (typeof body === "string") {
                    body = JSON.parse(body);
                }
            } catch (e) {
                body = {err: -1, msg: body}
            }

            loadFunc && loadFunc(body);
        } else {
            console.error(error);
            console.error(body);
        }
    })
}


function fetchHtml(path, loadFunc, requestData, filter, options) {
    var url;
    options = options || {};
    if (path.indexOf("http://")>=0) {
        url =  path;
    } else {
        url = static + path;
    }
    if (options.pathUrl && requestData.pathUrl) {
        url = url + requestData.pathUrl;
    }
    request({
        url: url + PathUtil.parsePathParam(requestData),
        method: "GET",
        encoding: null,
        headers: {
            "content-type": "text/html",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        },
    }, function(error, response, body) {
        if (!error) {
            if (options.encode) {
                body = iconv.decode(body, options.encode);
            }
            $ = cheerio.load(body,{decodeEntities: false});
            try {
                if (filter) {
                    body = filter($, body);
                }
            } catch (e) {
                body = {err: -1, msg: body}
            }

            loadFunc && loadFunc(body);
        } else {
            console.error(error);
            console.error(body);
        }
    })
}

module.exports = {
    fetchGet: fetchGet,
    fetchHtml:fetchHtml
};
