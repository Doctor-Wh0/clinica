const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
var session  = require('express-session');
const cookieParser = require('cookie-parser');
var passport = require('passport');
var flash    = require('connect-flash');

// Get our API routes
const api = require('./server/routes/api');

const app = express();
app.use(cors());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


app.use(session({
  secret: 'vidyapathaisalwaysrunning',
  resave: true,
  saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



// routes ======================================================================
require('./server/routes/authentication')(app, passport);
// Set our api routes
app.use(function(req, res, next){
	/*res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST');*/
	res.header('Access-Control-Allow-Origin', '*'); 
	res.header('Access-Control-Allow-Creditnails', true );
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, X-HTTP-Method-Override,Content-Type,Accept,content-type,application/json');
	//res.header('Access-Control-Allow-Headers', 'Content-Type');
	//console.log(req);
	//console.log(req.body);
	next();
})
require('./server/config/passport')(passport);
/*app.post('/login', cors(), (req, res) => {

	console.log(req.body.username);
	//alert("!");
	console.log(req.body.password);
	//console.log(JSON.stringify(req));
	console.log("CORS WORKS");
	res.json({msg: 'This is CORS-enabled for a Single Route [http]'})
});*/

/*app.post('/login', (req, res) => {

	console.log(req.body.username);
	//alert("!");
	console.log(req.body.password);
	//console.log(JSON.stringify(req));
	console.log("CORS WORKS");
	res.json({msg: 'This is CORS-enabled for a Single Route [http]'})
});*/

//app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));