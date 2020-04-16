const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const ingredients = require('./app/ingredients');

const app = express();
const port = 8001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);
    app.use('/users', users);
    app.use('/ingredients', ingredients);
    app.listen(port)
};

run().catch(e => {
    console.error(e)
});
