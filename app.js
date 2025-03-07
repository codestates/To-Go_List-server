const express = require('express');
const cors = require('cors');
const session = require('express-session');
// const cookieSession = require('cookie-session');

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtags');

const morgan = require('morgan');

const app = express();
const port = 3001;

app.use(
    session({
        secret: '$to-go-list-is-aWeSOmE!',
        resave: false,
        saveUninitialized: true
    })
);

// app.set('trust proxy', 1);
// app.use(
//     cookieSession({
//         name: 'session',
//         keys: ['$to-go-list-is-aWeSOmE!'],
//         maxAge: 24 * 60 * 60 * 100,
//         secure: true,
//         httpOnly: true,
//         sameSite: 'none'
//     })
// );

app.use(express.json());
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://to-go-list-client.s3-website.ap-northeast-2.amazonaws.com',
            'http://13.209.99.91:3001',
            'https://api.unsplash.com',
            'https://togolist.ml',
            'https://togolist-server.ml'
        ],
        methods: ['GET', 'POST', 'PATCH'],
        credentials: true
    })
);
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send('Hello I\'m In Docker Container Now!');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/hashtag', hashtagRouter);

app.listen(port, () => {
    console.log(`Express server is listening on PORT ${port}`);
});

module.exports = app;