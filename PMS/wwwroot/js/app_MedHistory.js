var app = angular.module('APIModule', ['AxelSoft']);

app.service('logservice', function ($http) {
    this.loadMedHistory = function (id, traceId, authkey) {
        console.log("https://localhost:5001/EHealthCareAPI/Treatments/treatMenthistory/" + id + "/" + traceId  + "/" + authkey);
        return $http({
            method: "GET",
            contentType: "application/json; charset=utf-8",
            url: "https://localhost:5001/EHealthCareAPI/Treatments/treatMenthistory/" + + id + "/" + traceId + "/" + authkey
        });
    };
});




app.controller('APIController', function ($scope, $timeout, $q, $window, $http, logservice) {

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
   

                console.log("patientdddddddd - ", $scope.patient);

                $scope.id = d.data.patientDetails.patientID;

            }, function (error) {
                console.log("Oops! Something went wrong while fetching the data.");
            });
            // Load Medi Data 

            $scope.medHistory = [];
            var loadMedHistory = logservice.loadMedHistory($scope.id, $scope.traceId, $scope.sessionKey.authKey)
            loadMedHistory.then(function (d) {

                console.log("Succss - ", d.data);

                var len = d.data.length;
                console.log("length", d.data.length);

                console.log("length", d.data.length);
                for (var i = 0; i < len; i++) {
                    console.log(i, "---", d.data[i]);
                    $scope.medHistory.push(d.data[i]);
                }
                console.log("medHistory", $scope.medHistory);

            }, function (error) {
                console.log("Oops! Something went wrong while fetching the data.");
            });


        },
        loadDoctor = function () {

           

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
    vm.loadDoctorSelected = function () {
        loadDoctor();
    };

    $scope.valuePatient = false;
    $scope.sessionKey = $window.SessionKey;

    console.log("sessionKeyMAINMENU", $scope.sessionKey);

    if ($scope.sessionKey.userType === "patient") {
        $scope.valuePatient = true;
    }
    console.log("value----", $scope.valuePatient);

    vm.pageLoad();


    $scope.saveData = function () {
        let isValiForSaving = false;
        for (let propertyName in $scope.Patient) {
            if ($scope.Patient[propertyName].length > 0) {
                isValiForSaving = true;
            }
        }

        if (isValiForSaving) {
            let newPerson = {};

            
                if (isEditing !== false) {

                    console.log("aa", isEditing);
                    console.log("data", ccc);

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
        
                    console.log("xxxxx", $scope.Patient);

                    var obj = {
                        password: $scope.sessionKey.password,
                        username: $scope.sessionKey.userName,
                        TimeSlot: "",
                        DoctorID: $scope.Patient.hospital.hospitalID,
                        ProblemBrief: $scope.Patient.ProblemBrief,
                        AppoinmentDate: $scope.Patient.AppoinmentDate,
                        Age: $scope.Patient.Age.toString(),
                        Patient: {
                            PatientMasterDataID: $scope.id
                        },
                        Doctor: {
                            DoctorID: $scope.Patient.doctor.doctorID
                        }, 
                        Hospital: {
                            HospitalID: $scope.Patient.hospital.hospitalID
                        }, 
                        authkey: $scope.sessionKey.authKey,
                        traceId: "102030"
                    }

                    var JsonEditString = JSON.stringify(obj);
                    console.log("JsonEditString--------", JsonEditString);

                    var saveData = logservice.save(obj)

                    saveData.then(function (d) {

                        console.log("Succss");
                        console.log("NewSAVE-----PERSON", d.data);
                        $scope.Patient = ""; 

                    }, function (error) {
                        console.log("Oops! Something went wrong while fetching the data.");
                    });


                }

            
            
        }
    }
   
});
