var userlib = require('../lib/users/users');
var index = require('../routes/index');

exports.reg = function(req,res){

    var     u  = req.body.username,
            fn = req.body.firstname,
            ln = req.body.lastname,
            e  = req.body.email,
            p1 = req.body.password1,
            p2 = req.body.password2;

    //Make sure all strings are valid
    if(ws(u) && ws(fn) && ws(ln) && ws(e) && ws(p1) && ws(p2)){

        //Check if the username is taken
        userlib.userExists(u,function(exists){
               if(exists){
                   index.setError('This username is already taken');
               }

                else{
                   //Do the passwords match?
                   if(p1 === p2){

                       //Add the user to the database!
                       userlib.addUser(u,fn,ln,e,p1);

                       //Log the user in
                       req.session.user = u;

                       //Redirect to the homepage
                       setTimeout(function() {
                           res.redirect('/');
                       }, 800);

                   } else {
                       index.setError("Your passwords don't match")
                   }
               }

        })

    }


    //One of the fields are empty. Return an error.
    else {
        index.setError('Required field left blank');
    }
};

//Check strings to see if they contain at least one character of non whitespace
ws = function(string){
    if(/\S/.test(string)){
        return true;
    } else {
        return false;
    }
};