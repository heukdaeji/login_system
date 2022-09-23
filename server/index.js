const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');
const { Quiz } = require('./models/Quiz');

//route start
app.use(express.static('views'));

app.set('view engine', 'ejs');

app.get('/quizmake', (req, res) => {
    res.render('quizmake');
})

app.get('/quiz', (req, res) => {
    res.render('quiz');
})

app.get('/quizsolve', (req, res) => {
    res.render('quizsolve');
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});
//route end

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {}).then(() => {
    console.log("Sussy mongo");
}).catch(err => console.log(err))

app.get('/api/hello', (req, res) => {
    res.send('this us super sus')
})

app.post('/api/users/register', (req, res) => {
    //information to sign up get
    //and put to db
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        })
    });
})

app.post('/api/users/login', (req, res) => {
    //check email exist in db
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "Cannot Find Account"
            });
        }
        //if exist, check password is correct
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({ loginSuccess: false, message: "Password Incorrect"});
            }
                //if correct, create token
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                // saving token in where? -> cookie
                // res.redirect('/');
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id, message: "Success" })
            })
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.get('/api/users/auth',  auth, (req, res) => {
    //auth success
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, 
        {token: ""}
        , (err, user) => {
            if (err) return res.json({ success:false, err});
            return res.status(200).send({
                success: true
            })
        })
})

app.post('/api/quiz/create', (req, res) => {
    const quiz = new Quiz(req.body);
    console.log(quiz);

    quiz.save((err) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({
            quizInfo: req.body,
            success: true,
            
        })
    });
})

app.get('/api/quiz/quizlist', (req, res) => {
    Quiz.count(function (err, count) {
        if (err) console.log(err);
        else res.json({
            count: count,
            success: true
        })
    })
})