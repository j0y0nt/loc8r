(function () {
    angular
        .module('loc8rApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'loc8rData'];
    function locationDetailCtrl($routeParams, $uibModal, loc8rData) {
        var vm = this;
        vm.locationid = $routeParams.locationid;
        var cbSuccess = function (response) {
            vm.data = { location: response.data }
            vm.pageHeader = {
                title: vm.locationid
            };
        };

        var cbFailure = function (response) {
            console.log(response);
        };
        //console.log(loc8rData.locationById(vm.locationid));
        loc8rData.locationById(vm.locationid).then(cbSuccess, cbFailure);

        vm.popupReviewForm = function () {
            var modalInstance = $uibModal.open({
                animation: false,
                backdropClass: "review-modal-bg",
                templateUrl: '/reviewModal/reviewModal.view.html',
                controller: 'reviewModalCtrl as vm',
                resolve: {
                    locationData: function () {
                        return {
                            locationid: vm.locationid,
                            locationName: vm.data.location.name
                        };
                    }
                }
            });
        };
    }
})();