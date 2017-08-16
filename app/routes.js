module.exports = function(app,passport){
	app.get('/',function(req,res){
		res.render('index.ejs');
	});

	//login form
	app.get('/login',function(req,res){
		res.render('login.ejs',{message:req.flash('loginMessage')});
	});
	//proecess the login form
	app.post('/login',passport.authenticate('local-login',{
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	//signup form
	app.get('/signup',function(req,res){
		res.render('signup.ejs',{message:req.flash('signupMessage')});
	});

	//process the signup form
	app.post('/signup',passport.authenticate('local-signup',{
		successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
	}));

	//profile selection
	app.get('/profile',isLoggedIn,function(req,res){
		res.render('profile.ejs',{
			user : req.user	//get the user out of session and pass to template
		});
	});

	//logout
	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect('/');
}