

var userlib = require('../lib/users/users');



exports.userPage = function(req,res){

    if(req.session.user){
        userlib.findUser(req.params.user, function(u){
            if(u){
                userlib.getMemos(u.uname, function(memos){
                    userlib.isFollower(u.uname,req.session.user,function(following){
                        res.render('user', {
                            title: 'Memento',
                            posts: memos,
                            username: u.uname,
                            fname: u.fname,
                            lname: u.lname,
                            email: u.email,
                            nMemos: u.memos,
                            nFollowers: u.followers,
                            nFollowing: u.following,
                            sessionHolder: req.session.user,
                            following: following
                        });
                    })


                })
            } else {
                res.redirect('/');
            }
        })
    } else {
        res.redirect('/');
    }

}



exports.memos = function(req,res){
      if(req.session.user){
           userlib.findUser(req.params.user, function(u){
               if(u){
                     userlib.getMyMemos(u.uname,function(memos){
                         userlib.isFollower(u.uname,req.session.user,function(following){
                             res.render('user', {
                                 title: 'Memento',
                                 posts: memos,
                                 username: u.uname,
                                 fname: u.fname,
                                 lname: u.lname,
                                 email: u.email,
                                 nMemos: u.memos,
                                 nFollowers: u.followers,
                                 nFollowing: u.following,
                                 sessionHolder: req.session.user,
                                 following: following
                             });
                         })
                     })
               } else {
                   res.redirect('/');
               }
           })
      } else {
          res.redirect('/');
      }
}
exports.following = function(req,res){
    var user = req.params.user;

    if(req.session.user){
        userlib.following(user,function(f){
            console.log(f);
            var sub = user+ ' is following...';
            res.render('follow', {
                title: 'Memento',
                subtitle: sub,
                follow: f
            })
        })
    } else {
        res.redirect('/');
    }
}


exports.followers = function(req,res){
    var user = req.params.user;

    if(req.session.user){
        userlib.followers(user,function(f){
            console.log(f);
            var sub = user+ ' is followed by...';
            res.render('follow', {
                title: 'Memento',
                subtitle: sub,
                follow: f
            })
        })
    } else {
        res.redirect('/');
    }
}










exports.follow = function(req,res){
    console.log(req.params.user);

    u = req.params.user;
    sessionU = req.session.user;

    if(u != sessionU){
        userlib.follow(u,sessionU);
    }

    setTimeout(function() {
        res.redirect('/'+u);
    }, 200);


}


exports.unfollow = function(req,res){
    console.log(req.params.user);

    u = req.params.user;
    sessionU = req.session.user;

    if(u != sessionU){
        userlib.unfollow(u,sessionU);
    }
    setTimeout(function() {
        res.redirect('/'+u);
    }, 200);

}