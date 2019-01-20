require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./handlers/error');

// requiring routes
const authRoutes = require('./routes/auth');

// settings
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    let err = new Error('Not found.')
    err.status = 404;
    next(err);
});

// using routes
app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is starting on ${port}`);
});