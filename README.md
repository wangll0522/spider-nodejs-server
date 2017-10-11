# 一个简单的nodejs实现爬虫，使用方便，功能强大，对拼多多微信端所有无权限接口采集
<pre>
    可在spider.config.js配置其他网站或接口数据爬取
</pre>

## 测试环境服务器地址：
    http://app.chuaq.com/appserver/v1/
    
###1. index/groups/:groupId
一级分组
<pre>
    index/groups/14?offset=0&opt_type=1&size=100&sort_type=DEFAULT&pdduid=0&is_back=1
</pre>
###2. index/carnival_images
首页活动图片
<pre>
    index/carnival_images?types[]=home_banner&types[]=floating_window&types[]=popup&types[]=popup_button&pdduid=0&is_back=1
</pre>
###3. index/subjects
首页banner
<pre>
    index/subjects?pdduid=0&is_back=1
</pre>
###4. index/spike_list
<pre>
    index/spike_list?page=2&size=30&pdduid=0
</pre>
###5. index/goods
二级物品列表
<pre>
    index/goods?page=1&size=10&list_id=index_goods_YCBA8S&pdduid=0
</pre>
###6. index/famous/:groupId/list
精选列表
<pre>
    index/famous/14/list?size=3&page=2&pdduid=0
</pre>
###7. index/famous/info/:infoId
精选详情
<pre>
    index/goods?page=1&size=10&list_id=index_goods_YCBA8S&pdduid=0
</pre>
###8. index/recommendation/goods/:goods_id
推荐商品
<pre>
    index/recommendation/goods/507?size=20&page=1&pdduid=0
</pre>
###9. new/subjects
最新商品主题
###10. new/list
最新商品列表
<pre>
    new/list?page=1&size=50&ver=0&pdduid=0
</pre>
###11. haitao/banner
海淘banner
###12. haitao/banner
海淘banner
<pre>
    haitao/list?page=1&size=50&ver=0&pdduid=0
</pre>
###12.5. search/query
关键字检索
<pre>
    search/query?q=&page=1&size=50&requery=0&sort=default&pdduid=0
</pre>
###12.6 search/suggest
输入提示
<pre>
    search/suggest?query=&pdduid=0
</pre>
###13. search/hot
热门搜索
<pre>
    search/hot?query=&pdduid=0
</pre>
###14. search/operations
获取分类
<pre>
    search/hot?query=&pdduid=0
</pre>
###15. search/groups/:groupId
获取分类内容，opt_type=2时为二级
<pre>
    groups/14?opt_type=1&offset=0&size=100&sort_type=DEFAULT&pdduid=0
</pre>

###16. profile/mobal
获取分类内容，opt_type=2时为二级
<pre>
    groups/14?opt_type=1&offset=0&size=100&sort_type=DEFAULT&pdduid=0
</pre>

###18. user/me
获取用户信息
<pre>
    user/me?check_app_login=1&check_weixin_sp=1&pdduid=4714173475
</pre>

###19. goods/:goods_id
获取商品详细信息
<pre>
    goods/10045
</pre>
###20. index/data
首页个别信息





