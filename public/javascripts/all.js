/**
 * @fileoverview
 * @author Harry <czy88840616@gmail.com>
 *
 */
(function($){
$.mustache = function (template, view, partials) {
    return Mustache.render(template, view, partials);
};

$.fn.mustache = function (view, partials) {
    return $(this).map(function (i, elm) {
        var template = $(elm).html().trim();
        var output = $.mustache(template, view, partials);
        return $(output).get();
    });
};

})(jQuery);

function reachBottom() {
    var scrollTop = 0;
    var scrollHeight = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
    }
    scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    if (scrollTop + clientHeight +5 >= scrollHeight) {
        return true;
    } else {
        return false;
    }
}

var loadingData = function(pageNo, callback){
    pageNo = pageNo || 1;

    $.get('/api', function(data){
        callback(data);
    });

};

$('#first').live('pageshow', function(){
    setTimeout(function(){
        $.mobile.changePage('#login', {
            allowSamePageTransition: true,
            transition:"flip"
        })
    }, 2000);
});

$('#login').live('pagecreate',function(){
    $('#login .submit-btn').delegate('#J_LoginBtn','click',function(){
        var username = $('#J_UserNameTxt').val();
        var password = $('#J_PassWordTxt').val();
        $.post('/auth',{TPL_username:username,TPL_password:password},function(rst){
            if(rst.isLogin){
                $.mobile.changePage('#msg', {
                    allowSamePageTransition: true,
                    transition:"flip"
                })
            }else {
                $('#J_LoginError').html('用户名或密码错误！');
            }
        });
    });
});

var isLoading = false,
    currentPageNo = 1;

var loadListData = function(){
    if(!isLoading && reachBottom()) {
        isLoading = true;
        $('#loading').show();
        loadingData({
            page_no:currentPageNo
        }, function(data){
            var template = $.mustache($('#list .listTemplate').val(), {
                items:data
            });
            $('#list .shop-list-ul').append(template);
            $('#loading').hide();
            isLoading = false;
            currentPageNo++;
        });
    }
};

$('#list').live("pagecreate", function(){
    loadingData({
        page_no: currentPageNo
    }, function(data){
        $('#loading').hide();
        var template = $.mustache($('#list .listTemplate').val(), {
            items:data
        });
        $('#list .shop-list-ul').append(template);
        currentPageNo++;
    });

    $('#list .shop-list-ul').delegate('a', 'click', function(ev){
        $('#itemId').val($(ev.target).attr('data-itemid'));
    });
});

$('#list').live('pageshow', function(){
    $(window).bind('scroll', loadListData);
});

$('#list').live('pagehide', function(){
    //取消绑定
    $(window).unbind('scroll', loadListData);
});

$('#shop').live("pagecreate", function(){
    loadingData({
        page_no:1
    }, function(data){
        
    });
});

// 收藏宝贝
$('#goods').live("pagecreate", function(){
    $.get('/api/items?itemIds=16098798732,20773380823,15913794840,15707731374,18510351145,14797615409,17802184761,15832178680,16264673673', function(data){
        console.log(data);
        var template = $.mustache($('#goods .J_GoodsTemp').val(), {
            goods:data
        });
        $('#J_GoodsList').append(template);
        $('#goods .shop-list-ul').delegate('a', 'click', function(ev){
            $('#itemId').val($(ev.target).attr('data-itemid'));
        });
    });
});


$('#itemdetail').live("pageshow", function(){
    $.mobile.loading('show');
    var itemid = $('#itemId').val();
    if(itemid) {
        $.get('/api/item', {
            itemId: itemid
        }, function(data) {
            var template = $.mustache($('#itemdetail .detailTemplate').val(), {
                item:data
            });

            $('#itemdetail .content').html(template);
            $.jqplot('chartdiv',  [[[1, 20],[2,5.12],[3,13.1],[4,9.6],[5,13.6]]]);

            $('#itemdetail .like').click(function(ev){
                $.mobile.loading('show');
                $(ev.target).parents('a').attr('data-theme', 'b');
                $(ev.target).parents('a').removeClass('ui-btn-hover-e ui-btn-up-e');
                $.mobile.loading('hide');
            });

            $('#itemdetail .hate').click(function(ev) {
                $.mobile.loading('show');
                $(ev.target).parents('a').attr('data-theme', 'b');
                $(ev.target).parents('a').removeClass('ui-btn-hover-c ui-btn-up-c');
                $.mobile.loading('hide');
            });
            $.mobile.loading('hide');
        });
    }
});

$('#comment').live('pageshow', function(){
    $.mobile.loading('show');
    var itemid = $('#itemId').val();
    if(itemid) {
        $.get('/api/comment', {
            itemId: itemid
        }, function(data) {
            var template = $.mustache($('#comment .commentTemplate').val(), {
                comments:data
            });

            $('#comment .content').html(template);

            $.mobile.loading('hide');
        });
    }
});

$('#taobaodetail').live('pageshow', function(){
    $.mobile.loading('show');
    var itemid = $('#itemId').val();
    if(itemid) {
        $.get('/api/item', {
            itemId: itemid
        }, function(data) {
            $('#taobaodetail .content').html('<iframe src="' +data.wap_detail_url+ '" style="height:'+document.documentElement.clientHeight+'px;width:320px"></iframe>');

            $.mobile.loading('hide');
        });
    }
});

