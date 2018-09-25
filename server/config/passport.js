const LocalStrategy   = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const config = require('./db');
const sql = require('mssql');

// Generates hash using bCrypt
  	var createHash = function(password){
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  	};

  	var isValidPassword = function(user, password){
      return bcrypt.compareSync(password, user.password);
  	};


module.exports = function(passport){

	sql.connect(config).then(function(){});

	passport.serializeUser(function(user, done) {
  		done(null, user);
      console.log("YES");
	});
	passport.deserializeUser(function(user, done) {
  		done(null, user);
	});

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        	
        	function(req, username, password, done) {
        		let user = {};
        		let hash = '';
        		new sql.Request().query(`SELECT * from [dbo].[accounts] WHERE [username] = '${username}'`).then(function(recordset) {
        			if(recordset.recordset.length >0) {console.log("We have that username"); console.dir(recordset.recordset[0].email); return done(null, false);}
        			else{ console.log("We have not that username");
                        console.log("Уже тут");
                        console.log(password);
                        console.log(createHash(password));
                        user.username = username;
                        user.email = req.body.email; 
                        
                        user.role = req.body.role;
                        if(user.role == undefined){user.role = "user"; console.log("role = undefined");}
                        hash = createHash(password);
                        new sql.Request().query(`INSERT into [dbo].[accounts] ([username], [email], [password], [role]) VALUES ('${user.username}', '${user.email}', '${hash}', '${user.role}')`)
                        .then(function() {
                        	console.log("User has registred");
                        	return done(null, user);

                        }).catch(function(err) {
                  console.log('Error in inserting to db.');
                  return done(null, false);
                  console.dir(err);
                });

                        
                    }
        		}).catch(function(err) {
                  console.log('Error is here.');
                  return done(null, false);
                  console.dir(err);
                });
        		console.log("SignUp: "+ username +" "+password);
        		return done(null, false);
        	}
        	
    ));

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
        	console.log("Login: "+ username +" "+password);
        	new sql.Request().query(`SELECT * FROM [dbo].[accounts] WHERE [username] = '${username}'`)
        	.then(function(recordset){
        		if(recordset.recordset.length == 0){ console.log("User is not exist"); return done(null, false);}
        		else{ 
        				//new sql.Request().query('SELECT [password] FROM [dbo].[accounts] WHERE [use]')
        				console.log(recordset.recordset[0].password);
        				console.log(password);
        				if(isValidPassword(recordset.recordset[0], password)){
        					let user = {};
        					user.username = recordset.recordset[0].username;
        					user.email = recordset.recordset[0].email;
        					user.role = recordset.recordset[0].role;
                  console.log("Login");
        					return done(null, user);
        				} else{ console.log("Password is invalid"); return done(null, false);}
        		}
        	}).catch(function(err) {
                  console.log('Error in logining to db.');
                  return done(null, false);
                  console.dir(err);
                });


        	//return done(null, false);
    	}
    	
    ));







}