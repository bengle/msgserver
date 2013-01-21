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
    $('#loading').hide();
    loadingData({}, function(data){
        var template = $.mustache($('#list .listTemplate').val(), {
            items:data
        });
        $('#shop-list-ul').html(template);
    });
});

$('#shop').live("pagecreate", function(){
    loadingData({}, function(data){
        var template = $.mustache($('#shop .listTemplate').val(), {
            items:data
        });
        $('#shop-list-ul').html(template);
    });
});