﻿var app = angular.module('apimodule', ['AxelSoft']);

app.service('logservice', function ($http) {
    this.save = function (sub) {
        console.log("aaaaaaaaaaa", sub);
        return $http({
            method: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Data/Save?strJson=" + sub + "&type=CourseType"

        });
    };
    this.update = function (sub, id) {
        console.log("aaaaaaaaaaa", sub);
        return $http({
            method: "POST",
            async: false,
            contentType: "application/json; charset=utf-8",
            url: "/Data/Update?strJson=" + sub + "&id=" + id + "&type=CourseType"

        });
    };
    this.delete = function (sub, id) {
        console.log("aaaaaaaaaaa", sub);
        return $http({
            method: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Data/Delete?strJson=" + sub + "&id=" + id + "&type=CourseType"

        });
    };
    this.loaddata = function (sub) {
        console.log("loaddata", sub);
        return $http({
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: sub,
            url: "https://localhost:5001/EHealthCareAPI/Patient/ValidatePatientRS"

        });
    };
    this.loadapoinments = function (traceId, id, authkey) {
        console.log("https://localhost:5001/EHealthCareAPI/Appoinment/" + traceId + "/" + id + "/" + authkey );
        return $http({
            method: "GET",
            contentType: "application/json; charset=utf-8",
            url: "https://localhost:5001/EHealthCareAPI/Appoinment/" + traceId + "/" + id + "/" + authkey 
        });
    };
});




app.controller('MainCtrl', function ($scope, $timeout, $q, $window, $http, logservice) {

    let vm = this,
        addressCollection = [],
        isEditing = false;

    // functions that are not attached to the view model
    let add = function () {
        let isValiForSaving = false;
        for (let propertyName in vm.Patient) {
            if (vm.model[propertyName].length > 0) {
                isValiForSaving = true;
            }
        }

        if (isValiForSaving) {
            let newPerson = {};

            if (!angular.equals({}, vm.model)) {
                if (isEditing !== false) {

                    console.log("aa", isEditing);
                    console.log("data", vm.model);

                    var editmodel = vm.model;

                    var JsonEditString = JSON.stringify(vm.model);

                    var updateData = logservice.update(JsonEditString, vm.model.ID)
                    var result = false;

                    updateData.then(function (d) {

                        console.log("Update - Succss", editmodel);
                        console.log("vm.model", vm.model);



                        addressCollection[isEditing] = editmodel;
                        isEditing = false;
                        result = true;

                    }, function (error) {
                        result = false;
                        console.log("Oops! Something went wrong while fetching the data.");
                        alert("Oops! Something went wrong while fetching the data.");
                    });

                    //if (result === true) {
                    //    console.log("Res");
                    //    addressCollection[isEditing] = vm.model;
                    //    isEditing = false;
                    //};

                } else {
                    newPerson = vm.model;
                    console.log("xxxxx", newPerson);
                    var JsonString = JSON.stringify(newPerson);
                    var savejson = vm.model;

                    var saveData = logservice.save(JsonString)

                    saveData.then(function (d) {

                        console.log("Succss");
                        console.log("NewPERSON", newPerson);
                        addressCollection.push(savejson);

                    }, function (error) {
                        console.log("Oops! Something went wrong while fetching the data.");
                    });


                }

                vm.addresses = addressCollection;
                vm.model = {};
            }
        }
    },
        edit = function (editPerson) {
            isEditing = addressCollection.indexOf(editPerson);
            vm.model = angular.copy(editPerson);
        },
        remove = function (removePerson) {
            let index = addressCollection.indexOf(removePerson);
            var JsonString = JSON.stringify(removePerson);


            var deleteData = logservice.delete(JsonString, removePerson.ID)

            deleteData.then(function (d) {

                console.log("Succss-Delete");
                console.log("NewPERSON", removePerson, "-", removePerson.ID);


                addressCollection.splice(index, 1);
                if (addressCollection.length === 0) {
                    vm.model = {};
                    vm.addresses = undefined;
                }

            }, function (error) {
                console.log("Oops! Something went wrong while fetching the data.");
            });



        },
        reset = function () {
            vm.model = {};
            vm.search = '';
            isEditing = false;
        },
        load = function () {
            vm.model = {};
            vm.search = '';
            isEditing = false;
            let newData = {};

            $scope.sessionKey = $window.SessionKey; 

            console.log("sessionKey", $scope.sessionKey);
            $scope.id = 0;
            $scope.traceId = 102030;

            // Load Patients Data

            var obj = {
                password: $scope.sessionKey.password,
                username: $scope.sessionKey.userName,
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
                authkey: $scope.sessionKey.authKey,
                traceId: "102030"
                
            }
 
            //var JsonString = JSON.stringify(obj);
            var loadData = logservice.loaddata(obj)
            loadData.then(function (d) {

                console.log("Succss - ", d.data);
                $scope.patient = {
                    surname: d.data.patientDetails.patientData.surname,
                    name: d.data.patientDetails.patientData.name,
                    dateOfBirth: d.data.patientDetails.patientData.dateOfBirth,
                    gender: d.data.patientDetails.patientData.gender,
                    homeAddress: d.data.patientDetails.patientData.homeAddress,
                    workAdderss: d.data.patientDetails.patientData.workAdderss,
                    mobileNumber: d.data.patientDetails.patientData.mobileNumber,
                    homeNumber: d.data.patientDetails.patientData.homeNumber,
                    depentes: d.data.patientDetails.patientData.depentes,
                    imageUrl: d.data.patientDetails.patientData.imageUrl,
                    email: d.data.patientDetails.patientData.email,
                    officeEmail: d.data.patientDetails.patientData.officeEmail,
                    patientID: d.data.patientDetails.patientID
                }

                console.log("patientdddddddd - ", $scope.patient);

                $scope.id = d.data.patientDetails.patientID;


                var loadApiment = logservice.loadapoinments($scope.traceId, $scope.id, $scope.sessionKey.authKey)
                loadApiment.then(function (d) {

                    console.log("Succss - ", d.data);

                    var len = d.data.length;
                    console.log("length", d.data.length);
                    for (var i = 0; i < len; i++) {
                        console.log(i, "---", d.data[i]);
                        addressCollection.push(d.data[i]);
                    }
                    $scope.apoinmentslist = addressCollection;

                    console.log("xxxxxxxx - ", apoinmentslist );
                    vm.model = {};
                }, function (error) {
                    console.log("Oops! Something went wrong while fetching the data.");
                });


 
            }, function (error) {
                console.log("Oops! Something went wrong while fetching the data.");
            });

            //Load Apoinments---------------------------------------------
 

           




        };

    // view model attached click handlers
    vm.addClickHandler = function () {
        add();
    };

    vm.editClickHandler = function (editPerson) {
        edit(editPerson);
    };

    vm.removeClickHandler = function (removePerson) {
        remove(removePerson);
    };

    vm.resetClickHandler = function () {
        reset();
    };
    vm.pageLoad = function () {
        load();
    };
    vm.pageLoad();
    $scope.people = [
        { name: 'John Doe', phone: '555-123-456', picture: 'http://www.saintsfc.co.uk/images/common/bg_player_profile_default_big.png' },
        { name: 'Axel Zarate', phone: '888-777-6666', picture: 'https://avatars0.githubusercontent.com/u/4431445?s=60' },
        { name: 'Walter White', phone: '303-111-2222', picture: 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg' }
    ];
});
