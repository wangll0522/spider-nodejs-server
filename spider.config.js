
module.exports = {
    url: "http://apiv4.yangkeduo.com/",
    proxy: {
        index: {
            "groups/:groupId": "v3/operation/:groupId/groups?offset=0&opt_type=1&size=100&sort_type=DEFAULT&pdduid=0&is_back=1",
            carnival_images:"carnival_images?types[]=home_banner&types[]=floating_window&types[]=popup&types[]=popup_button&pdduid=0&is_back=1",
            //首页banner图
            subjects: "subjects?pdduid=0&is_back=1",
            spike_list:"spike_list?page=2&size=30&pdduid=0",
            goods: "v4/goods?page=1&size=10&list_id=index_goods_YCBA8S&pdduid=0",
            "famous/:groupId/list":"famous_brand/:groupId/v2/list?size=3&page=2&pdduid=0",
            "famous/info/:infoId":"famous_brand/:infoId?size=20&page=1&pdduid=0",
            //推荐
            "recommendation/goods/:goods_id": "recommendation?goods_id=&referrer=goods&with_mall_rec=1&offset=0&count=12&list_id=goods_detail_rec_list_5KSkMf&pdduid=0"
        },
        new: {
            subjects:"avatars_subjects?pdduid=0",
            list:"v5/newlist?page=1&size=50&ver=0&pdduid=0"
        },
        haitao: {
            banner:"haitao_banner?pdduid=0",
            list: "v2/haitaov2?page=1&size=20&pdduid=0"
        },
        search: {
            //关键字检索
            query: "search?q=&page=1&size=50&requery=0&sort=default&pdduid=0",
            //输入提示
            suggest:"search_suggest?query=&pdduid=0",
            //热门搜索
            hot:"http://apiv4.yangkeduo.com/search_hotquery?pdduid=0",
            //获取分类
            operations:"operations?pdduid=0",
            //获取分类内容，opt_type=2时为二级
            "groups/:groupId":"v4/operation/:groupId/groups?opt_type=1&offset=0&size=100&sort_type=DEFAULT&pdduid=0"
        },
        profile: {
            //发验证码
            mobile: "mobile/code/request?pdduid=0",
            "user/me":"user/me?check_app_login=1&check_weixin_sp=1&pdduid=4714173475",

        }
    },
    static: "http://mobile.yangkeduo.com/",
    html: {
        "goods/:goods_id": {
             url: "goods.html",
            filter: function($, data) {
                 var html = data;
                 if (html) {
                     html = html.match(/window\.rawData= (\{.*?\});/g);
                     html = html || [];
                    console.log(html.length);
                     html = html[0].toString().replace(/window\.rawData= (\{.*?\});/g, "$1");
                 }

                return eval("("+ html +")");
            }
        },
        "index/data": {
             url: "index.html",
            filter: function($, data) {
                 var html = data;
                 if (html) {
                     html = html.match(/window\.rawData= (\{.*?\});/g);
                     html = html || [];
                     console.log(html.length);
                     html = html[0].toString().replace(/window\.rawData= (\{.*?\});/g, "$1");
                 }

                return eval("("+ html +")");
            }
        },
        "gsgl/detail": {
            url: "http://www.scjt.gov.cn/",
            options: {
                encode: "gb2312",
                pathUrl: true
            },
            filter: function($, data) {
                var result = {};
                var html = data;
                var header = $(".news_hd");
                result.title = header.find("h1").text();
                result.hb = [];
                header.find("span").each(function(it) {
                    var html;
                    if ($(this).find(".bshare-custom").length > 0) {

                    } else {
                        result.hb.push($(this).html());
                    }
                })
                result.centent = $(".news_ctt").html();
                return result;
            }
        }
    }

}
;