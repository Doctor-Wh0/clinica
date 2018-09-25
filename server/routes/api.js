const express = require('express');
/*const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const cors_app = express();*/
const router = express.Router();

/*cors_app.use(bodyParser.json());
cors_app.use(bodyParser.urlencoded({ extended: false }));
cors_app.use(cors());

cors_app.post('/login',cors(), (req, res) => {
	console.log(req.body.username);
	alert("!");
	console.log(req.body.password);
	console.log(JSON.stringify(req));
	res.json({msg: 'This is CORS-enabled for a Single Route'})
});
const port = process.env.PORT || '3001';
cors_app.set('port', port);
const server = http.createServer(cors_app);
server.listen(port, () => console.log(`API running on localhost:${port}`));*/



/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


router.post('/login', (req, res) => {
	console.log(req.body.username);
	alert("!");
	console.log(req.body.password);
	console.log(JSON.stringify(req));
	res.json({msg: 'This is CORS-enabled for a Single Route'})
});


module.exports = router;

/*const flash    = require('connect-flash');

module.exports = function(app, passport) {

	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/profile');
    	
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
*/