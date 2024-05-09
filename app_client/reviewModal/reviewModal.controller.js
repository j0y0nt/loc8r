(function () {
    // register controller with Angular.
    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    // inject model dependency in controller.
    reviewModalCtrl.$inject = ['$uibModalInstance', 'loc8rData', 'locationData'];
    function reviewModalCtrl($uibModalInstance, loc8rData, locationData) {
        var vm = this;
        vm.locationData = locationData;
        vm.modal = {
            close: function (result) {
                $uibModalInstance.close(result);
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };

        vm.onSubmit = function () {
            vm.formError = "";
            console.log('name  ' + vm.formData.name);
            console.log(vm.formData);
            if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        };

        vm.doAddReview = function (locationid, formData) {
            
            var cbSuccess = function (data) {
                console.log("Success!");
                vm.modal.close(data);
            };

            var cbError = function (data) {
                console.log(data)
                vm.formError = "Your review has not been saved, try again";
            };

            loc8rData.addReviewById(locationid, {
                "author": formData.name,
                "rating": formData.rating,
                "reviewText": formData.reviewText
            }).then(cbSuccess, cbError);
                
            return false;
        };
    }
})();