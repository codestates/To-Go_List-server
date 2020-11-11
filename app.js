const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.status(200).send('Hello I\'m In Docker Container Now!');
});

app.listen(port, () => {
    console.log(`Express server is listening on PORT ${port}`);
});