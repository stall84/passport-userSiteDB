
const express = require('express');
const db = require('./models');
const bodyParser = require('body-parser');
require('dotenv').config();
// requiring passport and GitHub 'strategy'
const passport = require('passport');
const GithubStrategy = require('passport-github');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 2;

const PORT = process.env.PORT;




const app = express();

app.use(bodyParser.json());
// Got form data finally submitting object data back to routes after setting body-parser extended: to false below
app.use(bodyParser.urlencoded({ extended: false } ));
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

app.get('/', (req,res,next) => {
    res.redirect('/home')
})

app.get('/home', (req,res,next) => {
    res.render('homepage', {
        title: 'UserDB-Site'
    })
})

app.get('/register', (req,res,next) => {
    res.render('registerPage', {
        title: 'User Registration'
    })
})

app.get('/login', (req,res,next) => {
    res.render('login')
})

app.post('/register/submit', (req,res,next) => {
    
    //const newUser = req.body

    const userName = req.body.fullName;
    const email = req.body.email;
    //const password = req.body.password
    const password = bcrypt.hash(req.body.password, saltRounds);

    //bcrypt.hash(password, saltRounds, (err))
    db.Users.create({ fullName:userName, email:email, password:password }).then(newDBUser => {
        if (newDBUser) {
            res.render('renderTest', {
                user_name: userName,
                email: email,
                password: password
            })
        }
    }).catch(err => {
        console.log(`There was a problem: ${err}`);
    })
    
    
    


    
    
    
})


