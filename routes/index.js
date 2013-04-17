var userlib = require('../lib/users/users');



var error = '';


// ## Pages Viewable when Logged In
exports.index = function(req, res){

    if(req.session.user !== undefined){
        var posts = userlib.getMemos(req.session.user);

        res.render('index', {
                                title: "Memento",
                                posts: posts
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
