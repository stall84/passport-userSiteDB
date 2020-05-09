
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
// requiring passport and GitHub 'strategy'
const passport = require('passport');
const GithubStrategy = require('passport-github');
const session = require('express-session');
const PORT = process.env.PORT;




const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true} ));
app.use(express.static(__dirname + '/public'));
app.use(session({secret: process.env.CLIENT_SECRET}));
app.use(passport.initialize());


app.set('view engine', 'ejs');
app.set('views', 'views');


passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3096/auth'
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

app.listen(PORT, () => {
    console.log('UsersDB Server UP and LISTENING on ' + PORT);
})

// GitHub login auth route
app.get('/github-auth', passport.authenticate('github'))

// Working on serving front-end views/components
app.get('/home', (req,res,next) => {
    res.render('landing1', {
        title: 'UserDB-Site'
    })
})