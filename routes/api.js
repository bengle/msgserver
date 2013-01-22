/**
 * @fileoverview
 * @author Harry <czy88840616@gmail.com>
 *
 */

var Taobao = require("itaobao"),
    formatjson = require('formatjson');


//var options = {'appKey':'12377650','appSecret':'340599aa7d7f515710146f392463221a'},
//    params  = {'method':'taobao.user.get','fields':'user_id,uid,sex,location','nick':'czy88840616'};

var config = {
    app_key:"21261604",
    app_secret:"31ef78b08e193a496c6647bedf0dfa3a",
    access_token:"6200822e4b2bcf77103f6d5490ded3ZZab0c909054b60a958804864"
};

var api=new Taobao(config);

var getGuang = function(req, res){
    var page_no = req.query.page_no || 1,
        page_size = req.query.page_size || 20,
        keyWord = '新款';

    api.taobaoke['items.get']({
        fields:'num_iid,title,nick,pic_url,price,click_url,commission,commission_rate,commission_num,commission_volume,shop_click_url,seller_credit_score,item_location,volume',
        keyword: keyWord,
        sort: 'commissionNum_desc',
        page_no: page_no,
        page_size: page_size,
        is_mobile: true
    },function(error,data){
        res.setHeader('Content-type', 'text/json');
        res.send(JSON.stringify(data['taobaoke_items_get_response']['taobaoke_items']['taobaoke_item']).replace(/<span class=H>.*?<\/span>/g, keyWord), null, 4);
    });
};

var getItem = function(req, res){
    var itemId = req.query.itemId;

    api.item['get']({
        num_iid: itemId,
        fields:'num_iid,detail_url,title,nick,type,skus,props_name,created,is_lightning_consignment,is_fenxiao,auction_point,property_alias,cid,pic_url,num,valid_thru,list_time,delist_time,location,price,approve_status,item_imgs,wap_desc'
    },function(error,data){
        res.setHeader('Content-type', 'text/json');
        res.send(data['item_get_response']['item']);
    });
};

//http://127.0.0.1:3000/api/items?itemIds=16139309646,13675556607
var getItems = function(req, res){
    var itemIds = req.query.itemIds;

    api.items['list.get']({
        num_iids: itemIds,
        fields:'num_iid,detail_url,title,nick,type,skus,props_name,created,is_lightning_consignment,is_fenxiao,auction_point,property_alias,cid,pic_url,num,valid_thru,list_time,delist_time,location,price,approve_status,item_imgs,wap_desc'
    },function(error,data){
        res.setHeader('Content-type', 'text/json');
        res.send(data['items_list_get_response']['items'].item);
    });
};

var getComment = function(req, res){
    var itemid = req.query.itemId;

    var comments = [
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":1,"items":[{"annoy":1,"buyer":"a**4","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61112234162,"text":"虽然货收到，有点小问题，还是给个5分吧，","type":0},{"annoy":0,"buyer":"eaglepan","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61111612546,"text":"收到裙子迫不及待打开试穿了下，上身效果真不错，不显胖，160、52kg穿xl刚刚好，生完孩子有点小肚子，不过穿上一点都看不出来，很满意，性价比高。","type":0},{"annoy":1,"buyer":"常**源","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61111721365,"text":"不错","type":0},{"annoy":1,"buyer":"s**9","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61108033199,"text":"给女儿买的，没看到实物，女儿说穿着正好，白色有点显胖，总之还可以给好评","type":0},{"annoy":1,"buyer":"y**1","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61111508961,"text":"宝贝很好，很喜欢，穿上很合适，很划算。谢谢卖家的小礼物~下次还会来滴~","type":0},{"annoy":1,"buyer":"w**1","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61111068002,"text":"衣服是还可以,就是有点掉毛","type":0},{"annoy":1,"buyer":"你**的","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61103785229,"text":"hao ,很好","type":0},{"annoy":1,"buyer":"l**0","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61111166376,"text":"质量可以","type":0},{"annoy":1,"buyer":"滟**杨","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61111351861,"text":"里衬好短！","type":0},{"annoy":0,"buyer":"tb117811_2012","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(普通版 现货)","rateId":61111063633,"text":"衣服还不错，也很便宜，料子摸起来也很舒服，第二次定了，真心推荐！不过物流不太给力","type":0}],"total":6}',
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":2,"items":[{"annoy":1,"buyer":"y**1","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61111268524,"text":"不错","type":0},{"annoy":1,"buyer":"t**2","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(普通版 现货)","rateId":61111140619,"text":"质量挺好的","type":0},{"annoy":1,"buyer":"慕**岚","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61111193789,"text":"裙子还不错，如果再收腰一点就好了，最郁闷的是我9号拍的货，居然22号才送到，坑爹啊，但愿卖家以后图便宜发这种坑爹的快递了。11号服务还不错，有耐心","type":0},{"annoy":1,"buyer":"褚**彪","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61110908946,"text":"有弹性卖家没有说 不过质量不错","type":0},{"annoy":1,"buyer":"怡**和","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61110892669,"text":"满意！","type":0},{"annoy":0,"buyer":"chenlinghaoyinan","credit":0,"date":"2013-01-22","deal":"","rateId":61110705004,"text":"衣服很喜欢，很漂亮，质量也好","type":0},{"annoy":1,"buyer":"王**8","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61110403509,"text":"喜欢","type":0},{"annoy":1,"buyer":"f**y","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61110336565,"text":"袖子那里加上绒就很完美了.比较修身,显瘦型的.能给厂家反应下买家的心声不???","type":0},{"annoy":0,"buyer":"varrina","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(普通版 现货)","rateId":61110182956,"text":"还好，毕竟这个价钱，还没来得及试穿，看着还行！","type":0},{"annoy":1,"buyer":"温**8","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61110132764,"text":"物流太慢啦，将近十天才到的，衣服还可以","type":0}],"total":50}',
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":3,"items":[{"annoy":0,"buyer":"varrina","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(普通版 现货)","rateId":61110182956,"text":"还好，毕竟这个价钱，还没来得及试穿，看着还行！","type":0},{"annoy":1,"buyer":"温**8","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61110132764,"text":"物流太慢啦，将近十天才到的，衣服还可以","type":0},{"annoy":0,"buyer":"宝宝昕29","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61109630722,"text":"特别舒服、称心的商品、很好看","type":0},{"annoy":0,"buyer":"恶魔来了88","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61110111113,"text":"不错，挺厚实的，手臂是单层的蕾丝，长度刚好可以当裙子穿，就是物流太慢了！","type":0},{"annoy":0,"buyer":"lovelypaul1","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61110007127,"text":"还可以","type":0},{"annoy":0,"buyer":"休休92","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61109879509,"text":"非常满意，快递也给力","type":0},{"annoy":1,"buyer":"y**滢","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61109645585,"text":"质量是可以，但物流的速度真是不敢恭维了","type":0},{"annoy":1,"buyer":"m**6","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61109039097,"text":"和图片一样很好看的衣服，挑剔的老公也说好看哦","type":0},{"annoy":0,"buyer":"guoguolele2009","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61109628603,"text":"这个价位还是很超值的，东西不错，可以搭配开衫穿","type":0},{"annoy":1,"buyer":"清**飞","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61109275395,"text":"就是短了点，还不错","type":0}],"total":50}',
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":4,"items":[{"annoy":1,"buyer":"f**7","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61109433159,"text":"很显身材，但是略嫌单调","type":0},{"annoy":1,"buyer":"q**t","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:L(普通版 现货)","rateId":61108701049,"text":"据说5星评价有一个自然年的全店包邮。所以全5星啦。等着以后买别的东西包邮。呵呵。这件衣服还不错。今天是2013年1月22日。mark一下。","type":0},{"annoy":0,"buyer":"luochu12345","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:L(普通版 现货)","rateId":61109140259,"text":"不错","type":0},{"annoy":1,"buyer":"h**8","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61108982609,"text":"全五分","type":0},{"annoy":1,"buyer":"吉**0","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61109196439,"text":"东西还不错，就是物流太慢啦","type":0},{"annoy":1,"buyer":"黑**5","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61109013473,"text":"东西终于收到了，等的够辛苦的，物流不是一班的慢，建议卖家换家物流也许生意会更好哦，还没试穿不过看着不错，选错颜色了，黑色应该更好搭衣服的，不过白色也很好看，总之东西还满意，物流不敢恭维","type":0},{"annoy":1,"buyer":"小**5","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61105246575,"text":"这个价钱的裙子质量非常好了，就是物流慢的可以","type":0},{"annoy":0,"buyer":"tb_5771240","credit":0,"date":"2013-01-22","deal":"","rateId":61108671163,"text":"发货速度太太太慢很！居然拍了一个想起都没发货！气很","type":0},{"annoy":1,"buyer":"z**8","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61108604228,"text":"不明白为什么明明7号发货，结果又显示11号才发货，花了十几天才到，非常非常慢啊！","type":0},{"annoy":0,"buyer":"芦屋瑞稀77","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61108517523,"text":"衣服不错，只是这发货速度和物流实在不敢恭维，如果不是在提示发货后3天一直木有物流更新，实在不耐烦反映给客服，估计继续等也不会收到衣服。直至提示发货7天后才拿到衣服，平邮都能到了！虽然衣服质量不错，但是已经让我心情糟糕了！","type":0}],"total":50}',
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":5,"items":[{"annoy":1,"buyer":"1**y","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(普通版 现货)","rateId":61108610025,"text":"还行\r\n不错","type":0},{"annoy":0,"buyer":"chenjianhua040201","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61108423443,"text":"嗯，怎么说呢，一般吧，可能期望值太高了","type":0},{"annoy":0,"buyer":"张曼秀羽","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(普通版 现货)","rateId":61108160788,"text":"刚刚收到衣衣就穿上了， 很合身， 很喜欢， 本人有点小胖但是穿上一点也不显胖很显瘦，质量也很好！喜欢的妹妹抓紧下手吧！","type":0},{"annoy":1,"buyer":"w**i","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(普通版 现货)","rateId":61108080139,"text":"评价晚了~不好意思~\r\n总体还不错~挺修身的~有点长了~而且也太薄了~只能不太冷的时候穿~","type":0},{"annoy":0,"buyer":"aaa359410003","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(普通版 现货)","rateId":61108127763,"text":"宝贝不错，满意","type":0},{"annoy":1,"buyer":"王**2","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61108031093,"text":"z质量很好 价格也便宜 就是发货比较慢 可能是量大的原因吧 建议卖家换家物流 建议用圆通 发货超快的","type":0},{"annoy":1,"buyer":"t**8","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61107614722,"text":"裙子没有图片看上去那么收腰，不过质量还是挺好的","type":0},{"annoy":1,"buyer":"静**j","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61107145049,"text":"很好","type":0},{"annoy":1,"buyer":"a**8","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61107797119,"text":"衣衣很漂亮哦&middot;&middot;&middot;质量挺好的&middot;&middot;穿在身上很显瘦&middot;&middot;&middot;超喜欢","type":0},{"annoy":0,"buyer":"sky4644","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61106788313,"text":"宝贝收到了，质量非常好，大小也正好，非常修身，价格十分的优惠，最重要是衣服的版型特别的好，上身非常显瘦，是一次非常开心的购物之旅","type":0}],"total":50}',
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":6,"items":[{"annoy":1,"buyer":"l**1","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61107442333,"text":"终于收到了将近半个月啊，过了十天才发货，买家不给力啊！衣服质量还可以吧!要是袖子上有打底绒会更好，大小刚合适。给个好评吧","type":0},{"annoy":1,"buyer":"t**1","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61106561881,"text":"非常漂亮，非常满意的裙子，弹力比较大。","type":0},{"annoy":1,"buyer":"z**8","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61107058558,"text":"不错，我很喜欢","type":0},{"annoy":1,"buyer":"牛**瓜","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61106938679,"text":"挺好的，基本上与描述无异，但是，肚肚上有肉的MM可要慎买哦， 本人160，54KG，买的L，会有点显肚上的肉肉，呵呵，就打底穿吧！发货速度实在不敢恭维！","type":0},{"annoy":0,"buyer":"xfzl12345","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61106969266,"text":"宝贝很好，很合身，快递也很给力\r\n！","type":0},{"annoy":0,"buyer":"tb5019693_00","credit":0,"date":"2013-01-22","deal":"","rateId":61106605959,"text":"裙摆没有图片上看起来大","type":0},{"annoy":1,"buyer":"雪**a","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61106737742,"text":"质量不错！内里加绒的，唯一是袖子不加绒，不过加绒了也不好看了！质量还可以，但不知道是不是掉色很严重。回去过水试一下。只是很佩服快递公司，衣服等了10几天才到，快递无语！","type":0},{"annoy":1,"buyer":"t**0","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61106671674,"text":"衣服也就一般 里面的一层棉挺好的 但外面的一层织花不怎么样 有松紧带的丝丝 发货特别慢 打两次电话才发货","type":0},{"annoy":0,"buyer":"幸福可以这么优雅","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61105876985,"text":"东西质量真的很好 这个价位能买到这个衣服真的很划算了  同事们都很喜欢 都问莪在哪买的 很喜欢。","type":0},{"annoy":1,"buyer":"s**y","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(普通版 现货)","rateId":61106549427,"text":"衣衣这个价格来说，质量是可以的。就是第一次衣衣有质量问题，换了一下，后来拍的时候涨了两块，也不给算之前的价格。第一次有个粉红色布袋的包装，很喜欢，这一次没有了","type":0}],"total":50}',
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":7,"items":[{"annoy":1,"buyer":"何**8","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(普通版 现货)","rateId":61106297547,"text":"超喜欢，这个价钱买到这质量的裙子是真心的好，感觉跟我买的好几百的一样，蕾丝滑滑的，一点不扎人，内里绒也很细，滑滑的，质量很不错！","type":0},{"annoy":1,"buyer":"何**8","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:L(普通版 现货)","rateId":61106297515,"text":"超喜欢，这个价钱买到这质量的裙子是真心的好，感觉跟我买的好几百的一样，蕾丝滑滑的，一点不扎人，内里绒也很细，滑滑的，质量很不错！","type":0},{"annoy":1,"buyer":"丫**兒","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61106434670,"text":"比较满意的一次网购，衣服很漂亮，质量也不错。。5分","type":0},{"annoy":0,"buyer":"lr75130","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61105961730,"text":"质量很好哦，穿着很漂亮啊","type":0},{"annoy":0,"buyer":"td果糖甜","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61106277676,"text":"等了很长时间才拿到宝贝，很喜欢。是值得等的宝贝","type":0},{"annoy":1,"buyer":"短**进","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(普通版 现货)","rateId":61106269107,"text":"最郁闷的一次网购，2013年1月3日拍下这件裙子，卖家1月4日发货，1月11日上海韵达公司宝山杨行分公司才将货发出，还是因为我在1月10日投诉了这一行为。本以为1月12日放假回家过年前能收到裙子，由于物流耽误，又麻烦卖家修改了发货地址，收到裙子后，可能是由于大批量成产的原因，裙子领子衣襟不对称，和卖家联系卖家给我换货，我把裙子寄回给卖家，重新拍了一件，结果把收货地址填错了，结果我现在收不到裙子，还得麻烦朋友去取，真是烦心透了。衣服质量还可以，这件什么样，我还没看到呢。希望其它妹妹能购物顺利","type":0},{"annoy":1,"buyer":"e**0","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61106018056,"text":"卖家东西还不错，希望店家以后换个合作快递，免得连累了自己~\r\n这&ldquo;韵达慢递&rdquo;实在太恶心，从上海走了半个月才收到北京，尼玛这是要环游全中国啊？！\r\n韵达慢递，我彻底服了！！","type":0},{"annoy":1,"buyer":"遗**1","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61106019489,"text":"很好，很漂亮，店主推荐的尺码很准确","type":0},{"annoy":1,"buyer":"海**l","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61105967941,"text":"一般吧！物流太慢了！","type":0},{"annoy":1,"buyer":"淘**g","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61106060681,"text":"性价比还算高","type":0}],"total":50}',
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":8,"items":[{"annoy":1,"buyer":"w**w","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61105569460,"text":"可以。比较值","type":0},{"annoy":1,"buyer":"乐**5","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61105803436,"text":"衣服还不错，穿着也合身，只是物流太慢，是我网购以为最慢的一次","type":0},{"annoy":1,"buyer":"孙**影","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(普通版 现货)","rateId":61105611164,"text":"衣服还好吧，我拍的是普通版的，衬里质量感觉实在很一般，不知道会不会卷起来？蕾丝感觉很容易勾丝，料子真的都非常薄，加绒的可能能好些，但是我想着我在深圳，应该用不到加绒吧...等穿几天再来追加评论吧\r\n\r\n真心吐槽物流啊，我12号拍的，今天才给我送到货，10天啊，亲，从欧洲过来也不需要这么久啊","type":0},{"annoy":1,"buyer":"s**n","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61105576206,"text":"衣服合身，款式大方，性价比高","type":0},{"annoy":1,"buyer":"f**4","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61105278993,"text":"好评！","type":0},{"annoy":1,"buyer":"蓝**的","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61105344885,"text":"买大了太长了  质量非常好","type":0},{"annoy":1,"buyer":"晴**鱼","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61105355236,"text":"衣服很好，不过卖家的发货速度和物流的速度完全不敢恭维。卖家在明知道这么多人投诉物流慢的情况下还继续用韵达快递令人无语。这个年头做电子商务就是牛，不接急件不发急货，快递变慢递，我们买的除了衣服外，还有服务，请卖家综合思量。","type":0},{"annoy":1,"buyer":"晴**鱼","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61105355204,"text":"衣服很好，不过卖家的发货速度和物流的速度完全不敢恭维。卖家在明知道这么多人投诉物流慢的情况下还继续用韵达快递令人无语。这个年头做电子商务就是牛，不接急件不发急货，快递变慢递，我们买的除了衣服外，还有服务，请卖家综合思量。","type":0},{"annoy":0,"buyer":"秋的印记_716","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:L(普通版 现货)","rateId":61105198913,"text":"很喜欢","type":0},{"annoy":0,"buyer":"秋的印记_716","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61105198945,"text":"很喜欢","type":0}],"total":50}',
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":9,"items":[{"annoy":0,"buyer":"gejinniu123321","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61104853393,"text":"有點長,快接近到膝蓋了,衫身寬度基本合身.物流不給力,差不多8天","type":0},{"annoy":0,"buyer":"tb6089540","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61104959397,"text":"可以","type":0},{"annoy":0,"buyer":"tb6089540","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61104959429,"text":"不错","type":0},{"annoy":1,"buyer":"华**0","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61105038359,"text":"很好，很漂亮","type":0},{"annoy":0,"buyer":"wow890228","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61104709108,"text":"第二次买了。给同事买的。同事都说很好看，下次还会光顾，给5分","type":0},{"annoy":1,"buyer":"轻**y","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61104915425,"text":"第二次买了挺好的，里面绒很厚，要是袖子有绒就好了","type":0},{"annoy":1,"buyer":"冬**4","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61101278191,"text":"做工有点粗糙，左前一片好像有点短，反正就是其中一片有点有明显短一点的感觉，质量还行吧。服务还行","type":0},{"annoy":1,"buyer":"1**谁","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61105099670,"text":"衣衣还不错没有色差很喜欢。就是本人有点胖，穿着有点瘦。总之都很好。给五分。","type":0},{"annoy":0,"buyer":"pipixiaotu","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61104969358,"text":"这个价钱买到这质量的裙子是真心的好，感觉跟我买的好几百的一样，蕾丝滑滑的，一点不扎人，内里绒也很细，滑滑的，质量很不错！就是物流奇慢，蜗牛啊","type":0},{"annoy":0,"buyer":"陌路人19681130","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(普通版 现货)","rateId":61104833054,"text":"质量不好，做工差。。。。。。。","type":0}],"total":50}',
        '{"allAppendCount":0,"allBadCount":0,"allNormalCount":0,"feedGoodCount":0,"index":10,"items":[{"annoy":0,"buyer":"陌路人19681130","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(普通版 现货)","rateId":61104833054,"text":"质量不好，做工差。。。。。。。","type":0},{"annoy":1,"buyer":"花**j","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61104628284,"text":"以前觉得网上没有质量好的蕾丝的衣服，买完的第二天下午就收到了，质量真的很好，检查了一下也没发现有蕾丝破的地方，总之很喜欢。。。","type":0},{"annoy":1,"buyer":"w**n","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61104395400,"text":"面料很软，里面的绒也软和，还可以。","type":0},{"annoy":1,"buyer":"随**2","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61104538916,"text":"衣服收到了，看起来还可以，只是衣服上的吊牌看起来并不像正品，不过还好了，几十块钱，对得起这个价了","type":0},{"annoy":0,"buyer":"ziling地瓜干","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61104444927,"text":"与页面介绍的还是有点差别，不过也还好","type":0},{"annoy":1,"buyer":"王**9","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:M(内里 加绒版)","rateId":61104160035,"text":"手感还是很好的，挺修身的，质量不错，卖家还送了小礼物，呵呵，不错","type":0},{"annoy":0,"buyer":"dasatan","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(普通版 现货)","rateId":61104336812,"text":"还行吧，东西值这个价","type":0},{"annoy":0,"buyer":"淡丶漠1606","credit":0,"date":"2013-01-22","deal":"颜色分类:黑色&nbsp;&nbsp;尺码:XXL(内里 加绒版)","rateId":61104271972,"text":"衣服挺好的 就是穿我这短了一点 ","type":0},{"annoy":0,"buyer":"baiyuanli","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:XL(内里 加绒版)","rateId":61104115713,"text":"衣服不错，但尺码有点偏小，买大一号就好了，减肥后再穿吧。物流有些慢，8天才收到货。冰天雪地的还是要给好评的，司机多不容易啊，不急着穿，慢点也无所谓啦。","type":0},{"annoy":1,"buyer":"枫**9","credit":0,"date":"2013-01-22","deal":"颜色分类:白色&nbsp;&nbsp;尺码:L(内里 加绒版)","rateId":61104036737,"text":"yy做工质量都很好，很值得~~","type":0}],"total":50}'
    ];

    res.setHeader('Content-type', 'text/json');
    res.send(JSON.parse(comments[itemid % 10]));
};

exports.route = function(req, res){
    var apiName = req.params.api;

    switch(apiName) {
        case 'guang':
            getGuang(req, res);
            break;
        case 'item':
            getItem(req, res);
            break;
        case 'items':
            getItems(req, res);
            break;
        case 'comment':
            getComment(req, res);
            break;
        default: getGuang(req, res);
    }

};