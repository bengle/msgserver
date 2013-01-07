/*
 * faverate page
 * */

exports.faverate = function(req, res){
	console.log('found faverate request!');
	res.render('faverate',{title: '我的收藏'});
};
