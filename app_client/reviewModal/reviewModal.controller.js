(function () {
    // register controller with Angular.
    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    // inject model dependency in controller.
    reviewModalCtrl.$inject = ['$uibModalInstance', 'locationData'];
    function reviewModalCtrl($uibModalInstance, locationData) {
        var vm = this;
        vm.locationData = locationData;
        vm.modal = {
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };
    }
})();