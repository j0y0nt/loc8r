var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsListByDistance = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.locationsCreate = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};  

module.exports.locationsReadOne =  async function (req, res) {

    if(!req.param && !req.param.locationid) {
        sendJsonResponse(res, 404, {
            "message": "No LocationId in request."
        });
        
    } else {
        const location = await Loc.findById(req.params.locationid).exec();

        if(location == null) {
            sendJsonResponse(res, 404, "location id not found.");
        }  else {
            sendJsonResponse(res, 200, location);
        }
    }
};

module.exports.locationsUpdateOne = function (req, res) {
    if (!req.params.locationid) {
        sendJsonResponse(res, 404, {
            "message": "Not found. locationid is required."
        });
        return;
    }

    const location = Loc.findById(req.params.locationid).select('-reviews -rating').exec();

    if(!location) {
        sendJsonResponse(res, 404, {"message": "locationid not found"});
        return;
    } else {
        location.name = req.body.name;
        location.address = req.body.address;
        location.facilities =  req.facilities.split(",");
        location.cootds = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        location.openingTimes = [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1,
        },{
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2,
        }];

        const result = location.save();

        if(result) {
            sendJsonResponse(res, 404, "location not found.");
        } else {
            sendJsonResponse(res, 200, location);
        }
    }
    
};

module.exports.locationsDeleteOne = function (req, res) {
    if (!req.params.locationid) {
        sendJsonResponse(res, 404, {
            "message": "Not found. locationid is required."
        });
        return;
    }

    const location = Loc.findByIdAndDelete(req.params.locationid).exec();

    if(!location) {
        sendJsonResponse(res, 404, {"message": "Location can not be deleted."});
        return;
    } else {
        sendJsonResponse(res, 204, nul);
    }
};