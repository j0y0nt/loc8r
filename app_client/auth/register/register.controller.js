(function () {
    angular
        .module('loc8rApp')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', 'authentication'];
    function registerCtrl($location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title: 'Create a new Loc8r account'
        };

        vm.credentials = {
            name: "",
            email: "",
            password: ""
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doRegister();
            }
        };

        vm.doRegister = function () {
            vm.formError = "";

            var cbRegisterSuccess = function (result) {
                console.log('in rc cbRegisterSuccess');
                console.log(result);
                $location.search('page', null);
                $location.path(vm.returnPage);
            };

            var cbRegisterError = function(err) {
                console.log('in rc ');
                console.log(err);
                vm.formError = err;
            };
            authentication
                .register(vm.credentials)
                .then(cbRegisterSuccess, cbRegisterError);
        }

    }
})();