
const User = require('../models/user');



module.exports.home = async function(req, res){



        return res.render('home', {
            title: "NodeJSAuth | Home",
            
        });


    
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
