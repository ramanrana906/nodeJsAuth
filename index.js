
const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const app = express();

const port = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT =require('./config/passport-jwt-strategy');
const passportGoogle =require('./config/passport-google-Oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware =require('node-sass-middleware');
const flash = require('connect-flash');
const customMware =require('./config/middleware')

//set up chat server

 const path = require('path');

 if(env.name=='development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'SCSS'),
        dest: path.join(__dirname,env.asset_path,'CSS'),
        debug: true,
        outputStyle: 'extended',
        prefix: "/css", // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
    }));
 }
 app.set('layout extractStyles', true);
 app.set('layout extractScripts', true);
 
 
 
 
 // set up the view engine
 app.set('view engine', 'ejs');
 app.set('views', './views');
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, env.asset_path)));
console.log(__dirname + "/" + env.asset_path);
//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options))
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout





// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'nodeJSAuth',
    // TODO change the secret before deployment in production mode
    secret: 'env.session_cookie_key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (10000 * 60 * 100)
    },
    store :  MongoStore.create ({
        
                 mongoUrl:`mongodb+srv://ramanrana:raman@cluster0.pwa4gcv.mongodb.net/test`,
           autoRemove:'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
