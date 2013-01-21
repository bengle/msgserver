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

$('#list').live("pagecreate", function(){
    var currentPageNo = 1,
        isLoading = false;

//    loadingData({
//        page_no: currentPageNo
//    }, function(data){
//        $('#loading').hide();
//        var template = $.mustache($('#list .listTemplate').val(), {
//            items:data
//        });
//        $('#list .shop-list-ul').append(template);
//        currentPageNo++;
//    });

    $(window).scroll(function(){
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
    });

    $('#list .shop-list-ul').delegate('a', 'click', function(ev){
        console.log(ev.target);
        $('#itemId').val($(ev.target).attr('data-itemid'));
    });
});

$('#shop').live("pagecreate", function(){
    loadingData({}, function(data){
//        var template = $.mustache($('#shop .listTemplate').val(), {
//            items:data
//        });
//        $('#shop-list-ul').html(template);
    });

});

$('#itemdetail').live("pageshow", function(){
    var itemid = $('#itemId').val();
    if(itemid) {
        $.get('/api/item', {
            itemId: itemid
        }, function(data) {
            $('#itemdetail .main').html(data);
        });
    }
});