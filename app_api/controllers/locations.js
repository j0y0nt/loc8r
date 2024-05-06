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
    sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.locationsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};