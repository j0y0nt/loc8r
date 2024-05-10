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
            //saveToken(result.token);
        };

        var cbRegisterSucess = function (result) {
            saveToken(result.token);
        };
        register = function (user) {
            return $http.post('/api/register', user).then(cbRegisterSucess, cbRegisterError);
        };

        login = function (user) {
            return $http.post('/api/login', user).success(function (data) {
                saveToken(data.token);
            });
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