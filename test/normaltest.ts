const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", (req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/test/get', (req, res) => {
    res.json({ to: 2012, from: req.query.from });
});

app.post('/test/post', (req, res) => {
    res.json(req.body);
});


app.listen(4001, () => console.log(`Now loading on port 4001...`));