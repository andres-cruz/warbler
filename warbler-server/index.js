const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// settings
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    let err = new Error('Not found.')
    err.status = 404;
    next(err);
});

app.listen(port, () => {
    console.log(`Server is starting on ${port}`);
});