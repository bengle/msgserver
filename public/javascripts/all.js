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
        $.mobile.changePage('#msg', {
            allowSamePageTransition: true,
            transition:"flip"
        })
    }, 2000);
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
    //·Çµ±Ç°Ò³ÃæÒª½â°ó
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
    loadingData({
        page_no:1
    }, function(data){
        console.log(data);
        var template = $.mustache($('#shop .J_GoodsTemp').val(), {
            goods:data
        });
        $('#J_GoodsList').append(template);
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
            var template = $.mustache($('#comment .detailTemplate').val(), {
                item:data
            });

            $('#comment .content').html(template);

            $.mobile.loading('hide');
        });
    }
});