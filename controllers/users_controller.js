const User = require('../models/user');
const fs = require('fs');
const path = require('path');





// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
       
    }

   
    return res.render('user_sign_up', {
        title: "NodeJSAuth | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/');
    }
   
    return res.render('user_sign_in', {
        title: "NodeJSAuth | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
    // res.clearCookie('codeial');
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
        req.flash('success','You have logged out');
      });

   
    // req.session.destroy(function (err) {
    //     res.redirect('/');
    //   });
}

