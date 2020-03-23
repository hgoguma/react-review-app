const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const reviewAPIRouter = require('./routes/review');

dotenv.config();
const app = express();
db.sequelize.sync(); //테이블 생성
passportConfig();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true })); //form 처리
app.use(cors({
    origin : true,
    credentials : true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false
    },
    name : 'bbo'
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/user', userAPIRouter);
app.use('/api/review', reviewAPIRouter);

app.listen(5000, () => {
    console.log('server is running on localhost 5000');
})