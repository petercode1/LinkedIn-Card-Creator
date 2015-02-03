process.env.NODE_ENV = 'development';


/*++++++++++++++++++++++++++++++++ EXTERNAL MODULES ++++++++++++++++++++++++++++++++*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var flash = require('connect-flash');
// var cookieParser = require('cookie-parser');



/*+++++++++++++++++++++++++++++++++++ CONTROLLERS +++++++++++++++++++++++++++++++++++*/

var authentController = require('./controllers/authentication.js');
var indexController = require('./controllers/index.js');
var profileController = require('./controllers/profile.js');
var publicController = require('./controllers/publicController.js');



/*++++++++++++++++++++++++++++++++++++ DATABASE ++++++++++++++++++++++++++++++++++++*/

// Connect to database MONGOLAB_URI
if (process.env.NODE_ENV === 'production') {
	mongoose.connect(process.env.MONGOLAB_URI);
} else {
	mongoose.connect('mongodb://localhost/ombud');
}



/*++++++++++++++++++++++++++++++++++++ MIDDLEWEAR ++++++++++++++++++++++++++++++++++++*/

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(flash());
// app.use(session({secret: 'aa3424-df1jdfhu', resave: false}));




/*++++++++++++++++++++++++++++++++++++++ ROUTES ++++++++++++++++++++++++++++++++++++++*/

// DIRECT THE USER TO THE LOGIN PAGE
app.get('/', indexController.index);
app.get('/auth/login', indexController.login);



/*___________________________ LinkedIn Login ___________________________*/

// Make API call for authorization
app.get('/auth/linkedin', authentController.URLsignIN);

// Redirected URL called by LinkedIn
app.get('/auth/linkedincallback/?', authentController.requestToken);
/*------------------------- End LinkedIn Login -------------------------*/



/*___________________________ Editable Profile ___________________________*/
app.get('/profile/editable/:userID/:customAccess', profileController.createCard);
app.get('/auth/getProfile', profileController.getProfile);
app.post('/profile/updateProfile', profileController.updateProfile);
app.post('/profile/share/wall', profileController.shareWall);
app.post('/profile/share/connection', profileController.shareConnection);
/*------------------------- End Editable Profile -------------------------*/



/*___________________________ Public Profile ___________________________*/
app.post('/public/:userID/generatePublic', publicController.generatePublic);
app.get('/public/:userID/share', publicController.publicProfile);
/*------------------------- End Public Profile -------------------------*/




/*++++++++++++++++++++++++++++++++++++++ SERVER ++++++++++++++++++++++++++++++++++++++*/

var port = process.env.PORT || 9092;
/*/
app.createServer(options, app).listen(port);

/*/
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
//*/
