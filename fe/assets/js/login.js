var app = angular.module('myApp', ['ngCookies']);
    app.controller('myCtrl', function ($scope, $http,$cookies) {
        $scope.login = function () {
            $scope.errmsg = "";
            var data = {
                username: $scope.username,
                password: $scope.password
            };
            $http({

                method: "POST",
                url: "/api/user/login",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data,
                transformRequest: function (data) {
                    return $.param(data);
                }
            }).success(function (response) {
                $scope.result = response.result;
                if ($scope.result.status == 0) {
                    $cookies.put("token", response.result.token);
                    $cookies.put("env", "offline");
                    $cookies.put("role", response.result.role);
                    $cookies.put("username", response.result.username);
                    console.log(response.result.role);
                    console.log(response.result);
                    if (response.result.role == 0){
                       window.location.href = 'query.html';
                    }
                    else{
                        window.location.href = 'index.html';
                    }


                }
                else {
                    $scope.errmsg = $scope.result.error_msg;
                }

            });
        };

    });