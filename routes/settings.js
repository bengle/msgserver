/**
 * @fileoverview
 * @author Harry <czy88840616@gmail.com>
 *
 */
exports.routeSetting = function(req, res){
    if(req.params.page) {
        res.render('settings/' + req.params.page, {});
    } else {
        res.render('setting', {});
    }
};