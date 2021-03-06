/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , auth = require('./routes/local-session')
    , reg = require('./routes/register')
    , post = require('./routes/posting')
    , userPage = require('./routes/userPage');



var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/logout', auth.logout);
app.get('/register', routes.reg);


app.get('/:user',userPage.userPage);
app.get('/memos/:user',userPage.memos);
app.get('/followers/:user',userPage.followers);
app.get('/following/:user',userPage.following);


app.get('/follow/:user',userPage.follow);
app.get('/unfollow/:user',userPage.unfollow);


app.post('/authenticate', auth.auth);
app.post('/auth-reg', reg.reg);
app.post('/posting',post.post);









http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});