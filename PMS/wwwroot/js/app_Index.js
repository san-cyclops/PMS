//var app = angular.module('APIModuleMenu', []);
var app = angular.module('APIModule', []);

app.service('logservicemenu', function ($http) {
    this.getList = function (sub) {
        return $http({
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: sub,
            url: "https://localhost:5001/EHealthCareAPI/Token"

        });
    };

});


app.controller('APIController', function ($scope, $http, $window, logservicemenu) {



    $scope.valuePatient = false;
    $scope.sessionKey = $window.SessionKey;
    
    console.log("sessionKeyMAINMENU", $scope.sessionKey);

    if ($scope.sessionKey.userType === "patient") {
        $scope.valuePatient = true;
    } 
    console.log("value----", $scope.valuePatient);

    $scope.login = function () {


        var sub = {
            userType: "string",
            userStatus: true,
            traceId: "string"
        }
        var servCall = logservice.getList(sub);
        servCall.then(function (d) {
            console.log("Done", d.data);
            console.log(d.data.authenticationKey);
            $scope.param = d.data.authenticationKey;
            //$window.open('/Home/Index');
            var sessionKey = {
                AuthKey: $scope.param
            }
            var JsonString = JSON.stringify(sessionKey);

            console.log("sessionKey", JsonString);

            //$http.post('/Home/Index', JsonString);

            var url = '/Home/Index?UserName=' + $scope.UserName + "&Password=" + $scope.Password + "&AuthKey=" + $scope.param
            window.open(url, "_self");

        }, function (error) {
            console.log("Oops! Something went wrong while fetching the data.");
        });


    };




});