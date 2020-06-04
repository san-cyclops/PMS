var app = angular.module('APIModule', []);

app.service('logservice', function ($http) {
    this.loadapoinments = function (traceId, id, authkey) {
        console.log("https://localhost:5001/EHealthCareAPI/ViewAllApoinments/" + traceId + "/" + "/" + authkey);
        return $http({
            method: "GET",
            contentType: "application/json; charset=utf-8",
            url: "https://localhost:5001/EHealthCareAPI/ViewAllApoinments/" + traceId + "/"  + "/" + authkey
        });
    };

});




app.controller('APIController', function ($scope, $window, $http, logservice) {

     
    $scope.valueDoctor = false;
    $scope.valuePatient = false;
    $scope.sessionKey = $window.SessionKey;
    $scope.traceId = "102030"

    console.log("sessionKeyMAINMENU", $scope.sessionKey);

    if ($scope.sessionKey.userType === "doctor") {
        $scope.valueDoctor = true;
    }
    console.log("value----", $scope.valueDoctor);

    console.log("loadApiment -----");
    $scope.appointment = [];
    var loadApiment = logservice.loadapoinments($scope.traceId, $scope.sessionKey.authKey)
    loadApiment.then(function (d) {

        console.log("Succss - ", d.data);

        var len = d.data.length;
        console.log("length", d.data.length);
        for (var i = 0; i < len; i++) {
            console.log(i, "---", d.data[i]);
            $scope.appointment.push(d.data[i]);
        }
         
    }, function (error) {
        console.log("Oops! Something went wrong while fetching the data.");
    });
});
