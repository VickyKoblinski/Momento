

var userlib = require('../lib/users/users');



exports.userPage = function(req,res){
    var u = userlib.findUser(req.params.user);

    //If user exists and a user is logged on, go to that user's page
    if(u && req.session.user){
        var memos = userlib.getMemos(u.username,req);


        res.render('user', {
            title: 'Memento',
            posts: memos,
            username: u.username,
            fname: u.firstname,
            lname: u.lastname,
            email: u.email,
            nMemos: u.memos.length,
            nFollowers: u.followers.length,
            nFollowing: u.following.length,
            sessionHolder:false
        });
    }

    //User does not exist
    else{
        res.redirect('/');
    }


}