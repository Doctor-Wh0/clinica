const flash    = require('connect-flash');
//const http = require('http');
module.exports = function(app, passport) {

	/*app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});*/

	// process the login form
/*	
app.post('/login', passport.authenticate('login', {
            successRedirect : '/zet', // redirect to the secure profile section
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
    */

    app.post('/login', passport.authenticate('login'),
        function(req, res, next) {
            console.log("hello");
            let user = {};
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
            if(req.isAuthenticated()){
            	console.log("sesseionID: "+req.sessionID);
            	let body = {user: req._passport.session.user, sessionID: req.sessionID };
            	res.send(body);
            	console.log("True");
            } else {console.log("False");}
        res.send();
    	
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	/*app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});*/

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



	app.get('/isloged', function(req, res){
		console.log('isloged?');
		let body = {status: false, role: undefined};
		if (req.isAuthenticated()){
			body.status = true;
			body.role = req._passport.session.role;
			res.send(body);
		} else {
			body.status = false;
			body.role = undefined;
		 	res.send(body) 
		 }
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