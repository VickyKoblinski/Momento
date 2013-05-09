var userlib = require('../lib/users/users');
//              require('http://code.jquery.com/jquery-1.7.1.min.js');


//Add the post and redirect to the homepage
exports.post = function(req,res){
    var msg = req.body.post;
    var usr = req.session.user;

//    alert('test');

    userlib.addMemo(msg,usr, function(){
        userlib.getNewestMemo(usr,function(memo){
            res.json(memo);
        });
    });

//    setTimeout(function(){

//    }, 2000 )


}