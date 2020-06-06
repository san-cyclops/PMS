var app = angular.module('APIModule', []);

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

});




app.controller('APIController', function ($scope, $window, $http, logservice) {

    let vm = this,
        addressCollection = [],
        isEditing = false;

    // functions that are not attached to the view model
    let add = function () {
        let isValiForSaving = false;
        for (let propertyName in vm.Patient) {
            if (vm.coursetype[propertyName].length > 0) {
                isValiForSaving = true;
            }
        }

        if (isValiForSaving) {
            let newPerson = {};

            if (!angular.equals({}, vm.coursetype)) {
                if (isEditing !== false) {

                    console.log("aa", isEditing);
                    console.log("data", vm.coursetype);

                    var editcoursetype = vm.coursetype;

                    var JsonEditString = JSON.stringify(vm.coursetype);

                    var updateData = logservice.update(JsonEditString, vm.coursetype.ID)
                    var result = false;

                    updateData.then(function (d) {

                        console.log("Update - Succss", editcoursetype);
                        console.log("vm.coursetype", vm.coursetype);
                        alert("Update - Succss");


                        addressCollection[isEditing] = editcoursetype;
                        isEditing = false;
                        result = true;

                    }, function (error) {
                        result = false;
                        console.log("Oops! Something went wrong while fetching the data.");
                        alert("Oops! Something went wrong while fetching the data.");
                    });

                    //if (result === true) {
                    //    console.log("Res");
                    //    addressCollection[isEditing] = vm.coursetype;
                    //    isEditing = false;
                    //};

                } else {
                    newPerson = vm.coursetype;
                    console.log("xxxxx", newPerson);
                    var JsonString = JSON.stringify(newPerson);
                    var savejson = vm.coursetype;

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
                vm.coursetype = {};
            }
        }
    },
        edit = function (editPerson) {
            isEditing = addressCollection.indexOf(editPerson);
            vm.coursetype = angular.copy(editPerson);
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
                    vm.coursetype = {};
                    vm.addresses = undefined;
                }

            }, function (error) {
                console.log("Oops! Something went wrong while fetching the data.");
            });



        },
        reset = function () {
            vm.coursetype = {};
            vm.search = '';
            isEditing = false;
        },
        load = function () {
            vm.coursetype = {};
            vm.search = '';
            isEditing = false;
            let newData = {};

            $scope.sessionKey = $window.SessionKey;


            console.log("sessionKey", $scope.sessionKey);

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

                //var len = d.data.patientDetails.length;

                $scope.patient = {
                    Surname: d.data.patientDetails.patientData.surname,
                    Name: d.data.patientDetails.patientData.name,
                    DateOfBirth: d.data.patientDetails.patientData.dateOfBirth,
                    Gender: d.data.patientDetails.patientData.gender,
                    HomeAddress: d.data.patientDetails.patientData.homeAddress,
                    WorkAdderss: d.data.patientDetails.patientData.workAdderss,
                    MobileNumber: d.data.patientDetails.patientData.mobileNumber,
                    HomeNumber: d.data.patientDetails.patientData.homeNumber,
                    Depentes: d.data.patientDetails.patientData.depentes,
                    ImageUrl: d.data.patientDetails.patientData.imageUrl,
                    Email: d.data.patientDetails.patientData.email,
                    OfficeEmail: d.data.patientDetails.patientData.officeEmail,
                    ID: d.data.patientDetails.patientID,
                    Alias: d.data.patientDetails.patientData.alias
                }
                 
                vm.coursetype = {};
            }, function (error) {
                console.log("Oops! Something went wrong while fetching the data.");
            });



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


    $scope.valuePatient = false;
    $scope.sessionKey = $window.SessionKey;

    console.log("sessionKeyMAINMENU", $scope.sessionKey);

    if ($scope.sessionKey.userType === "patient") {
        $scope.valuePatient = true;
    }
    console.log("value----", $scope.valuePatient);

    vm.pageLoad();
});
