﻿var app = angular.module('APIModule', []);

app.service('logservice', function ($http) {
    this.loadapoinments = function (traceId,authkey) {
        console.log("https://localhost:5001/EHealthCareAPI/Appoinment/ViewAllApoinments?TraceId=" + traceId + "&AuthKey=" + authkey);
        return $http({
            method: "GET",
            contentType: "application/json; charset=utf-8",
            url: "https://localhost:5001/EHealthCareAPI/Appoinment/ViewAllApoinments?TraceId=" + traceId + "&AuthKey=" + authkey
        });
    };

});




app.controller('APIController', function ($scope, $window, $http, logservice) {

     


    $scope.traceId = "102030"
    $scope.valueDoctor = false;
    $scope.valuePatient = false;
    $scope.valueAdmin = false;
    $scope.valuePharmacists = false;

    $scope.sessionKey = $window.SessionKey;

    console.log("sessionKeyMAINMENU", $scope.sessionKey);

    if ($scope.sessionKey.userType === "patient") {
        $scope.valuePatient = true;
    }
    if ($scope.sessionKey.userType === "doctor") {
        $scope.valueDoctor = true;
    }
    if ($scope.sessionKey.userType === "admin") {
        $scope.valueAdmin = true;
    }
    if ($scope.sessionKey.userType === "pharmacists") {
        $scope.valuePharmacists = true;
    }
  
    console.log("value----", $scope.valueDoctor);

    console.log("loadApiment -----");
    $scope.apoinmentslist = [];
    var loadApiment = logservice.loadapoinments($scope.traceId, $scope.sessionKey.authKey)
    loadApiment.then(function (d) {

        console.log("Succss - ", d.data);

        var len = d.data.length;
        console.log("length", d.data.length);
        for (var i = 0; i < len; i++) {
            console.log(i, "---", d.data[i]);
            $scope.apoinmentslist.push(d.data[i]);
        }
         
    }, function (error) {
        console.log("Oops! Something went wrong while fetching the data.");
    });
});
