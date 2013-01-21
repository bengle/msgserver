/*
 * faverate page
 * */
var top = require('top');
var client = top.createClient({
  appkey: '1237765',
  appsecret: '340599aa7d7f515710146f392463221a'
});

exports.getList = function(req, res){
	client.taobao_items_list_get({fields:'num_iid,title,nick,pric'},function(err, items){
		console.log(items);
	});
	/*
	res.render('list',{title: '逛一逛',
		items:[
			{
				itemLink:"http://localhost:3000/",
				itemDesc:"这里是宝贝的描述",
				itemLogo:"/images/avartar.jpg",
				favRate:"90%",
				storeLimit:100,
				latestTime:"2012-12-23"
			},
			{
				itemLink:"http://localhost:3000/",
				itemDesc:"这里是宝贝的描述",
				itemLogo:"/images/avartar.jpg",
				favRate:"90%",
				storeLimit:100,
				latestTime:"2012-12-23"
			},
			{
				itemLink:"http://localhost:3000/",
				itemDesc:"这里是宝贝的描述",
				itemLogo:"/images/avartar.jpg",
				favRate:"90%",
				storeLimit:100,
				latestTime:"2012-12-23"
			}
		]
	});
	*/
};
