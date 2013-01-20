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

var loadingData = function(pageNo){
    pageNo = pageNo || 1;

    $.get('/api', function(data){
        var template = $.mustache($('#listTemplate').val(), {
            items:data
        });

        $('#shop-list-ul').html(template);
    });

};

$(function(){
    $('#loading').hide();
    loadingData();
});