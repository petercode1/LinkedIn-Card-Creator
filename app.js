var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

// Config
var passportConfig = require('./config/passportConfig.js');

// Controllers
var authentController = require('./controllers/authentication.js');
var indexController = require('./controllers/index.js');
var profileController = require('./controllers/profile.js');
var publicController = require('./controllers/publicController.js');


// Connect to database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/ombud');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(flash());
app.use(session({secret: 'ajdfhu', resave: true}));
app.use(passport.initialize());
app.use(passport.session());




// DIRECT THE USER TO THE LOGIN PAGE
app.get('/', indexController.index);

app.get('/auth/login', indexController.login);

app.get('/auth/sign-in', authentController.signIn);



/*+++++++++++++++++++++++++++ LinkedIn Login +++++++++++++++++++++++++++*/
app.get('/auth/linkedin', authentController.URLsignIN);



app.get('/auth/linkedincallback', authentController.requestToken);



/*------------------------- End LinkedIn Login -------------------------*/


app.get('/profile/editable/:userID/:customAccess', profileController.createCard);
app.get('/auth/getProfile', profileController.getProfile);
app.post('/profile/updateProfile', profileController.updateProfile);
app.post('/profile/share/wall', profileController.shareWall);
app.post('/profile/share/connection', profileController.shareConnection);

app.post('/public/:userID/generatePublic', publicController.generatePublic);
app.get('/public/:userID/share', publicController.publicProfile);
app.get('/public/test', publicController.test);

// Prevent un-signed-in navigation
app.use(passportConfig.ensureAuthent);





var port = process.env.PORT || 9092;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
