(function () {
    angular
        .module('loc8rApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', 'loc8rData'];
    function locationDetailCtrl($routeParams, loc8rData) {
        var vm = this;
        vm.locationid = $routeParams.locationid;
        var cbSuccess = function(response) {
            vm.data = { location: response.data }
            vm.pageHeader = {
                title: vm.locationid
            };
        };

        var cbFailure = function(response) {
            console.log(response);
        };
        //console.log(loc8rData.locationById(vm.locationid));
        loc8rData.locationById(vm.locationid).then(cbSuccess, cbFailure);
    }
})();