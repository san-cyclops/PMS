var app = angular.module('APIModule', []);

app.service('logservice', function ($http) {
    this.getList = function (sub) {
        return $http({
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data : sub,
            url: "https://localhost:5001/EHealthCareAPI/Token"
           
        });
    };
    this.signUp= function (sub) {
        console.log("signUp----", "https://localhost:5001/EHealthCareAPI/Patient/SignupPatient");
        return $http({
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: sub,
            url: "https://localhost:5001/EHealthCareAPI/Patient/SignupPatient"

        });
    };
});


app.controller('APIController', function ($scope, $http, $window,logservice) {

    $scope.UserName = 'doctor1@gmail.com';
    $scope.Password = '123';

    $scope.login = function () {


        var sub = {
            userName: $scope.UserName,
            password: $scope.Password,
            userType : "string",
            userStatus : true,
            traceId : "string" 
        }
        var servCall = logservice.getList(sub);
        servCall.then(function (d) {
            console.log("Done", d.data);
            if (!d.data.authenticationKey) {
                alert(d.data.error);
            }
            else {

                console.log(d.data.authenticationKey);
                $scope.param = d.data.authenticationKey;
                $scope.userType = d.data.userType
                //$window.open('/Home/Index');
                var sessionKey = {
                    UserName: $scope.UserName,
                    Password: $scope.Password,
                    UserType: $scope.userType,
                    AuthKey: $scope.param
                }
                var JsonString = JSON.stringify(sessionKey);

                console.log("sessionKey", JsonString);

                //$http.post('/Home/Index', JsonString);

                var url = '/Home/Index?UserName=' + $scope.UserName + "&Password=" + $scope.Password + "&AuthKey=" + $scope.param + "&UserType=" + $scope.userType
                window.open(url, "_self");
            }

        }, function (error) {
            console.log("Oops! Something went wrong while fetching the data.");
        });
    };

    $scope.signUp = function () {
         
        var sub = {
            password: $scope.Password,
            username: $scope.UserName,
            patientMasterDataID: 0,
            userStatus: "",
            patientData: {
                surname: "",
                name: "",
                dateOfBirth: "",
                gender: "",
                homeAddress: "",
                depentes: "",
                workAdderss: "",
                mobileNumber: "",
                homeNumber: "",
                officeNumber: "",
                imageUrl: "",
                officeEmail: "",
                email: "",
                alias: "",
                patientDataID: 0,
                patientMasterDataID: 0
            },
            authkey: "",
            traceId: "102030"
        }
        console.log("xxxxxxxxxxxxxx", sub);
        var servCall = logservice.signUp(sub);
        servCall.then(function (d) {
            console.log("Done", d.data);
            if (!d.data.status) {
                alert(d.data.error);
            }
            else {
                $scope.UserName = '';
                $scope.Password = '';
                alert(d.data.statusMessage);
                onclick = "openCity(event, 'London')
            }

        }, function (error) {
            console.log("Oops! Something went wrong while fetching the data.");
        });

    };
       
   
    
});











