const express = require('express');
const cors = require('cors');
const session = require('express-session');

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
// const hashtagRouter = require('./routes/hashtags');

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

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
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
// app.use('/hashtag', hashtagRouter);

app.listen(port, () => {
    console.log(`Express server is listening on PORT ${port}`);
});

module.exports = app;