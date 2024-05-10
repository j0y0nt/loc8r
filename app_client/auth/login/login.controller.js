(function () {

    angular
        .module('loc8rApp')
        .controller('loginCtrl', loginCtrl);
    
    loginCtrl.$inject = ['$location', 'authentication'];
    function loginCtrl($location, authentication) {
        var vm = this;
        
        vm.pageHeader = {
            title: 'Sign in to Loc8r'
        };

        vm.credentials = {
            email: "",
            password: ""
        };
        
        vm.returnPage = $location.search().page || '/';

        // Handle login form submission
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doLogin();
            }
        };

        // Handle login event
        vm.doLogin = function () {
            vm.formError = "";

            var cbLoginSuccess = function() {
                $location.search('page', null);
                $location.path(vm.returnPage);
            };

            var cbLoginError = function(result) {
                vm.formError = result;
            };
            authentication
                .login(vm.credentials)
                .then(cbLoginSuccess, cbLoginError);
        };
    }
    
})();