// Users information. Later to be replaced with database calls.

var Sequelize = require('sequelize');
var sequelize = new Sequelize('memento', 'root');



//Attempt logging in a user
exports.login = function(user, password, logged){

    sequelize.query("SELECT * FROM users WHERE uname='"+user+"';")
        .success(function(myTableRows) {

            //If the user exists
            if(myTableRows.length != 0){
                var userData = myTableRows[0];

                //If their password is correct
                if(userData.password === password){
                    console.log('Matching user found');
                    logged(user,undefined);
                }

                //Their password is incorrect
                else {
                    logged(undefined,'Incorrect Password');
                    console.log('Incorrect password');
                }
            }

            //If the user does not exist
            else {
                logged(undefined,'User does not exist.');
                console.log('User does not exist');
            }
        })
        .error(function(){        });  //TODO

}

//Find if username exists
exports.findUser = function(user,cb){

    basicInfo(user,function(u){
        //If the user exists, continue
        if(u){
            nStatistics(user,function(r1,r2,r3){

                var usr = {
                    uname: u.uname,
                    fname: u.fname,
                    lname: u.lname,
                    email: u.email,
                    followers: r1.followers,
                    following: r2.following,
                    memos: r3.memos
                }

                cb(usr);
            })
        } else {
            //User does not exist
            cb(false);
        }
    })


}



basicInfo = function(u,cb){
    var query = "SELECT uname, fname, lname, email FROM users WHERE uname='"+u+"';";


    sequelize.query(query)
        .success(function(usr){
            if(usr.length != 0){
                cb(usr[0]);
            }
            else {
                cb(false);
            }
        })
        .error(function(){}); //TODO
}

nStatistics = function(u,cb){
    var query1 =  "SELECT COUNT(*) as followers FROM follow WHERE following='"+u+"';",
        query2 =  "SELECT COUNT(*) as following FROM follow WHERE follower='"+u+"';",
        query3 =  "SELECT COUNT(*) as memos FROM memos WHERE uname='"+u+"';";

    sequelize.query(query1)
        .success(function(r1){
            sequelize.query(query2)
                .success(function(r2){
                    sequelize.query(query3)
                        .success(function(r3){
                            var results = [];

                            cb(r1[0],r2[0],r3[0]);


                        })
                        .error(function(){}); //TODO
                })
                .error(function(){}); //TODO
        })
        .error(function(){}); //TODO
}



exports.isFollower = function(u, sessionU,cb){
    var query = "SELECT COUNT(*) AS follow FROM follow WHERE following='"+u+"' AND follower='"+sessionU+"';";

    sequelize.query(query)
        .success(function(results){
            //Return whether there were any results
            cb(results[0].follow > 0);
        })
        .error(function(){}); //TODO
}


exports.userExists = function(u,cb){
    var query = "SELECT COUNT(*) AS nUsers FROM users WHERE uname='" + u +"';";

    sequelize.query(query)
        .success(function(u){
            var exists = u[0].nUsers;
            if(exists>0){
                cb(true);
            } else {
                cb(false);
            }
        })
}


//Add a newly registered user to the database
exports.addUser = function(username,firstname,lastname,email,password){

          sequelize.query(
              "INSERT INTO users VALUES('" + username +
                  "','" + firstname +
                  "','" + lastname +
                  "','" + email +
                  "','" + password + "');")
              .success(function() { }) //TODO
              .error(function() {});  //TODO


}


exports.addMemo = function(msg,usr,cb){
  //INSERT INTO memos VALUES ('user2', 'memos are cool!', NOW());
    sequelize.query(
        "INSERT INTO memos VALUES('" + usr +
            "','" + msg +
            "',NOW(),'');")
        .success(function() {cb();}) //TODO
        .error(function() {}); //TODO

}

exports.getMyMemos = function(u,cb){
    var query = "SELECT uname AS poster, memo AS msg, date FROM memos " +
        "WHERE uname='"+u+"' ORDER BY date DESC";

    sequelize.query(query)
        .success(function(memos){
            cb(memos);
        })
        .error(function(){}) //TODO
}

exports.getMemos = function(u,cb){

    var query = "(SELECT distinct m.uname AS poster, m.memo AS msg, m.date AS date FROM users u " +
    "INNER JOIN follow f ON f.follower = u.uname " +
    "INNER JOIN memos m ON m.uname = f.following " +
    "WHERE u.uname = '"+u+"') " +
    "UNION "+
    "(SELECT uname AS poster, memo as msg, date from memos "+
    "where uname = '"+u+"') "+
    "ORDER BY date DESC"




    sequelize.query(query,null,{raw: true, type: 'SELECT'})
        .success(function(memos){
            cb(memos);
        })
        .error(function(){}); //TODO

}


exports.unfollow = function(u,sessionU){
    var query = "DELETE FROM follow WHERE following='"+u+"' AND follower='"+sessionU+"';";

    sequelize.query(query)
        .success(function(){}) //TODO
        .error(function(){}) //TODO
}

exports.follow = function(u,sessionU){

    var query = "INSERT INTO follow (follower,following) VALUES ('"+sessionU+"','"+u+"');";


    sequelize.query(query)
        .success(function(){}) //TODO
        .error(function(){}) //TODO
}



exports.following = function(u,cb){
    var query = "SELECT following AS uname FROM follow WHERE follower='" + u +"';";

    sequelize.query(query)
        .success(function(r){
            cb(r)
        })
        .error(function(){}) //TODO
}


exports.followers = function(u,cb){
    var query = "SELECT follower AS uname FROM follow WHERE following='" + u +"';";

    sequelize.query(query)
        .success(function(r){
            cb(r);
        })
        .error(function(){}) //TODO
}


exports.getNewestMemo = function(u,cb){
    var query = "SELECT uname AS poster, memo as msg, date from memos "+
        "where uname = '"+u+"' "+
        "ORDER BY date DESC LIMIT 1";


    sequelize.query(query,null,{raw: true, type: 'SELECT'})
        .success(function(memos){
            cb(memos[0]);
        })
        .error(function(){}); //TODO

}