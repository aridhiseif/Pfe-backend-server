const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({

    firstname: String,
    lastname : String,
    email : String , 
    password : String,
    etat : String
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);