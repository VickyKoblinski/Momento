// Users information. Later to be replaced with database calls.



var users = [
        {
            username:"user1",
            firstname:"Elisa",
            lastname:"Jingle",
            email:"email1@e.com",
            pass:"1",
            followers:["user2"],
            following:["user2"],
            memos:[{
                msg:"My memo!",
                date:new Date("October 12, 1988 13:14:00")
            }]
        },
        {
            username:"user2",
            firstname:"John",
            lastname:"Bell",
            email:"email2@e.com",
            pass:"2",
            followers:["user1", "user3"],
            following:["user1"],
            memos:[]
        },
        {
            username:"user3",
            firstname:"Jacob",
            lastname:"Deer",
            email:"email3@e.com",
            pass:"3",
            followers:[],
            following:["user2"],
            memos:[]
        }
    ];




//Attempt logging in a user
exports.login = function(user, password, logged){
    //check for a a matching user.

    var userData = this.findUser(user);

    //If the user exists
    if(userData){
         //Check if password matches
         if(userData.pass === password){
             logged(user,undefined);
             console.log('Matching user found');
         }

         else {
             logged(undefined,'Incorrect Password');
             console.log('Incorrect password');
         }
    }

    //If the user exists
    else {
         logged(undefined,'User does not exist.');
         console.log('User does not exist');
    }

}

//Find if username exists
exports.findUser = function(user){
    for(var i = 0; i < users.length; i++){
        if(users[i].username === user){
            return users[i];
        }
    }
    return undefined;
}


//Add a newly registered user to the database
exports.addUser = function(username,firstname,lastname,email,password){
          var o = {
              username:username,
              firstname:firstname,
              lastname:lastname,
              email:email,
              pass:password,
              followers:[],
              following:[],
              memos:[]
          };

        users.push(o);
}


exports.addMemo = function(msg,usr){
    var memo = {
        msg:msg,
        date:new Date()
    }

    var ourUser = this.findUser(usr);
    ourUser.memos.push(memo);

}


exports.getMemos = function(u,req){

        u = this.findUser(u);

        var listMemos = [];



        //Add all your followings' memos to the list
        for(var i = 0; i < u.following.length; i++){
                var following = this.findUser(u.following[i]);

                for(var j = 0; j < following.memos.length; j++){
                    var memo = {
                                 date: following.memos[j].date,
                                 msg: following.memos[j].msg,
                                 poster: following.username
                               };
                    listMemos.push(memo);

                }
        }

        //Add all your memos to the list
            for(var i = 0; i< u.memos.length; i++){
                var memos = u.memos;

                var memo = {
                            date: memos[i].date,
                            msg: memos[i].msg,
                            poster: u.username
                           };
                listMemos.push(memo);

            }



        //Sort the list
        listMemos.sort(sortByDateDesc);
        return listMemos;

}

// This is a comparison function that will result in dates being sorted in
// DESCENDING order.
var sortByDateDesc = function(memo1,memo2){
    if(memo1.date > memo2.date) return -1;
    if(memo1.date < memo2.date) return 1;
    return 0;
};

