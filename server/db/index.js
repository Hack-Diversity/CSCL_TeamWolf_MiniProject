const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://dbadmin:HackW0lf2021@cluster0.cvcx6.mongodb.net/cscl', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;