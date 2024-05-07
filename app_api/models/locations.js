var mongoose = require('mongoose');

// Opening closing info of location.
var openingTimeSchema = new mongoose.Schema({
    days: { type: String, required: true },
    opening: String,
    closing: String,
    closed: { type: Boolean, required: true }
});

// Schema for review information.
var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewText: {type: String, required: true},
    createdOn: { type: Date, "default": Date.now }
})

// Location Details.
var locationSchema = new mongoose.Schema({
    name: { type: String, reqired: true },
    address: String,
    rating: { type: Number, "default": 0, min: 0, max: 5 },
    facilities: [String],
    coords: { type: [Number], index: '2dsphere' },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);