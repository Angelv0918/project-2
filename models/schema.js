const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    name: { type: String },
    url: { type: String },
    image: { type: String }
});

const animeModel = mongoose.model('anime', animeSchema);

module.exports = animeModel;