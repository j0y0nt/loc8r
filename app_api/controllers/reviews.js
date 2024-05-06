var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var doSetAverageRating = function (location) {
    var i, reviewCount, ratingAverage, ratingTotal;
    if (location.reviews && location.reviews.length > 0) {
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for (i = 0; i < reviewCount; i++) {
            ratingTotal = ratingTotal + location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        location.rating = ratingAverage;
        const result = location.save();

        if(result) {
            console.log("Average rating updated to", ratingAverage);
        } else {
            console.log(result);
        }
        
    }
};

var updateAverageRating = function (locationid) {
    const location = Loc.findById(locationid).select('rating reviews')
        .exec();

    if (location) {
        doSetAverageRating(location);
    } else {
        console.log('error while averaging rating. ');
    }
};

var doAddReview = async function (req, res, location) {
    if (!location) {
        sendJsonResponse(res, 404, {
            "message": "locationid not found"
        });
    } else {
        console.log('---- req.body --- ' + JSON.stringify(req.body));
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        const result = await location.save();

        if (result) {
            updateAverageRating(result._id);
            thisReview = result.reviews[result.reviews.length - 1];
            sendJsonResponse(res, 201, thisReview);
        } else {
            sendJsonResponse(res, 400, err);
        }

    }
};
module.exports.reviewsCreate = async function (req, res) {
    var locationid = req.params.locationid;
    if (locationid) {
        const location = await Loc
            .findById(locationid)
            .select('reviews')
            .exec();

        if (location) {
            doAddReview(req, res, location);
        } else {
            sendJsonResponse(res, 400, err);
        }

    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, locationid required."
        });
    }
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.reviewsReadOne = async function (req, res) {
    console.log(req.params);
    if (req.params && req.params.locationid && req.params.reviewid) {
        const location = Loc
            .findById(req.params.locationid)
            .select('name reviews')
            .exec();

        if (location) {
            if (location.reviews && location.reviews.length > 0) {
                review = location.reviews.id(req.params.reviewid);

                response = {
                    location: {
                        name: location.name,
                        id: req.params.locationid
                    },
                    review: review
                };
                sendJsonResponse(res, 200, response);
            } else {
                sendJsonResponse(res, 404, {
                    "message": "reviewid not found."
                });
            }

        } else {
            sendJsonResponse(res, 404, {
                "message": "Location not found."
            });
            return;
        }
    } else {
        sendJsonResponse(res, 400, {
            "message": "Not found, locationid and reviewid are both required."
        });
    }
    //sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.reviewsupdateOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.reviewsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};
