
/*
 * GET home page.
 */

exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
    //res.redirect('msg');
    res.render('index', {
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