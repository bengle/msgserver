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
        default: getGuang(req, res);
    }

};