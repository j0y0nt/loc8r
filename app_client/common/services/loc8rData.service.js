(function () {

    angular
        .module('loc8rApp')
        .service('loc8rData', loc8rData);

    loc8rData.$inject = ['$http', 'authentication'];
    function loc8rData($http, authentication) {
        var locationByCoords = function (lat, lng) {
            return $http.get('/api/locations?lng=' + lat + '&lat=' + lat + '&maxDistance=20');
        };

        var locationById = function (locationid) {
            return $http.get('/api/locations/' + locationid);
        };

        var addReviewById = function (locationid, data) {
            console.log(data);
            console.log('sending data');
            const httpOptions = {
                headers: {
                  'Content-Type':  'application/json',
                  'Authorization': 'Bearer ' + authentication.getToken()
                }
              };
            return $http.post('/api/locations/' + locationid + '/reviews', data, httpOptions);
        }

        return {
            locationByCoords: locationByCoords,
            locationById: locationById,
            addReviewById: addReviewById
        };
    }

})();