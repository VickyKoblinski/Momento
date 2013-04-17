var userlib = require('../lib/users/users');
var index = require('../routes/index');





exports.auth = function(req,res){
    var user = req.session.user;
    console.log(user);



    //The user is already logged in
    if(user !== undefined){
        res.redirect('/'); //Redirect them to the main page, they are logged in!

    }

    //The user is not logged in
    else{
        //Get the username and password from form
        var username = req.body.username;
        var password = req.body.password;


        //Look for the user
        userlib.login(username,password,function(user,error) {
            if(error){
                //If the login fails, set the error message and return to the login screen
                index.setError(error);
                res.redirect('/login');

            }

            else{
                //If the login succeeds, redirect to main and set the user to logged in
                req.session.user = user;
                res.redirect('/');
            }
        })
    }
}


//Logout
exports.logout = function(req,res){

        req.session.user = undefined;
        index.setError('');
        res.redirect('/login');

}