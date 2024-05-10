(function () {
    angular
        .module('loc8rApp')
        .service('authentication', authentication);

    authentication.$inject = ['$window', '$http'];
    function authentication($window, $http) {
        var saveToken = function (token) {
            $window.localStorage['loc8r-token'] = token;
        };
        var getToken = function () {
            return $window.localStorage['loc8r-token'];
        };

        var cbRegisterError = function (result) {
            console.log(result);
            // TODOs: Handle registration error
        };

        var cbRegisterSuccess = function (result) {
            saveToken(result.data.token);
        };
        register = function (user) {
            return $http.post('/api/register', user).then(cbRegisterSuccess, cbRegisterError);
        };

        var cbLoginError = function (result) {
            console.log(result);
            // TODOs: Handle login error
        };

        var cbLoginSuccess = function (result) {
            saveToken(result.data.token);
        };

        login = function (user) {
            return $http.post('/api/login', user).then(cbLoginSuccess, cbLoginError);
        };

        logout = function () {
            $window.localStorage.removeItem('loc8r-token');
        };

        var isLoggedIn = function () {
            var token = getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser
        };
    }
})();