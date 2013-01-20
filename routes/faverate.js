/*
 * faverate page
 * */

exports.fav = function(req, res){

	res.render('faverate',{title: '我的收藏',
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
};
