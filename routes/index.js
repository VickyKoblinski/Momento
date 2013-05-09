var userlib = require('../lib/users/users');



var error = '';


// ## Pages Viewable when Logged In
exports.index = function(req, res){
    var user = req.session.user;

    if(user !== undefined){


        userlib.getMemos(user,function(posts){
            userlib.findUser(user, function(u){
                res.render('index', {
                    title: "Memento",
                    posts: posts,
                    username: u.uname,
                    fname: u.fname,
                    lname: u.lname,
                    email: u.email,
                    nMemos: u.memos,
                    nFollowers: u.followers,
                    nFollowing: u.following,
                    sessionHolder: req.session.user,
                    following: false
                });
            });
        });

    } else {
        res.redirect('/login');
    }

};




exports.post = function(req,res){

    if(req.session.user !== undefined){
        res.render('post', {title: "Memento"});
    } else {
        res.redirect('/login')
    }
}





// ## Pages viewable when NOT logged in
display = function(page, req, res){
    res.render(page, {  title: 'Memento',
        error: error});

    error = '';
    redirectIfLoggedIn(req,res);
}

exports.login = function(req, res){
    display('login',req,res);
};

exports.reg = function(req, res){
    display('register',req,res);
};


exports.setError = function(newError){
    error = newError;
};




//Redirect to the homepage if a user is logged in.
redirectIfLoggedIn = function(req, res){
    if(req.session.user !== undefined){
        res.redirect('/');
    }
}

//Redirect to the login page if the user is not logged in.
redirectIfNotLoggedIn = function(req,res){
    if(req.session.user === undefined){
        res.redirect('/login');
    }
}
