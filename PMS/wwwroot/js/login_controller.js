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

});


app.controller('APIController', function ($scope, $http, $window,logservice) {
 
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
            console.log(d.data.authenticationKey);
            var param = d.data.authenticationKey;
            //$window.open('/Home/Index');
            var url = '/Home/Index?authKey=' + param 
            window.open(url);

        }, function (error) {
            console.log("Oops! Something went wrong while fetching the data.");
        });
        

    };

       
   
    
});











