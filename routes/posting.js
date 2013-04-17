var userlib = require('../lib/users/users');


//Add the post and redirect to the homepage
exports.post = function(req,res){
    var msg = req.body.post;
    userlib.addMemo(msg,req.session.user);

    res.redirect('/');

}