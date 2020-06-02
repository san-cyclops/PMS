var app = angular.module('apimodule', ['AxelSoft']);

app.service('logservice', function ($http) {
    this.save = function (sub) {
        console.log("Appoinment---SAVE", sub);
        return $http({
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: sub,
            url: "https://localhost:5001/EHealthCareAPI/Appoinment"
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
    this.loadHospital = function (traceId,lat,lot, authkey) {
        console.log("https://localhost:5001/EHealthCareAPI/Patient/" + traceId + "/" + lat +"/" + lot+ "/" +  authkey);
        return $http({
            method: "GET",
            contentType: "application/json; charset=utf-8",
            url: "https://localhost:5001/EHealthCareAPI/Patient/" + traceId + "/" + lat + "/" + lot + "/" + authkey
        });
    };
    this.loadDoctor = function (traceId, hospitalID, authkey) {
        console.log("https://localhost:5001/EHealthCareAPI/Doctor/" + traceId + "/" + hospitalID + "/" + authkey);
        return $http({
            method: "GET",
            contentType: "application/json; charset=utf-8",
            url: "https://localhost:5001/EHealthCareAPI/Doctor/" + traceId + "/" + hospitalID + "/" + authkey
        });
    };
    this.loadMedHistory = function (id, traceId, authkey) {
        console.log("https://localhost:5001/EHealthCareAPI/Treatments/treatMenthistory/" + id + "/" + traceId  + "/" + authkey);
        return $http({
            method: "GET",
            contentType: "application/json; charset=utf-8",
            url: "https://localhost:5001/EHealthCareAPI/Treatments/treatMenthistory/" + + id + "/" + traceId + "/" + authkey
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

                console.log("loadApiment -----");
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
                    vm.model = {};
                }, function (error) {
                    console.log("Oops! Something went wrong while fetching the data.");
                });

                console.log("loadHospital -----");
                var loadHospital = logservice.loadHospital($scope.traceId, 455555.2 , 455555.2, $scope.sessionKey.authKey)
                loadHospital.then(function (d) {

                    

                    $scope.hospital = [];

                    var len = d.data.length;
   

                    //distance: 3835494.584969937
                    //email: "athurugiriyaHospital@gov.lk"
                    //hospitalAddress: "102 Kaduwela - Athurugiriya Road, Colombo"
                    //hospitalID: 1000
                    //hospitalName: "Athurugiriya Hospital"
                    //latitude: 0
                    //longitude: 0
                    //negativeFeedbacks: 2
                    //positiveFeedbacks: 5
                    //telephoneNumber: "0112561229"
                    

                    for (var i = 0; i < len; i++) {
                   
                        var name = d.data[i].hospitalName;
                        var phone = d.data[i].telephoneNumber;
                        var hospitalID = d.data[i].hospitalID;
                        var address = d.data[i].hospitalAddress;
                        var feedback = d.data[i].positiveFeedbacks;
                        $scope.hospital.push({
                            name: name,
                            phone: phone,
                            hospitalID: hospitalID,
                            address: address,
                            feedback: feedback
                        });
                    }
                    console.log("Succss loadHospital- ", $scope.hospital);
                    
                    
                   // person
                    //loadDoc ----------------------------
                    $scope.doctor = [];
                    var loadDoc = logservice.loadDoctor($scope.traceId, 0 , $scope.sessionKey.authKey)
                    loadDoc.then(function (d) {
                         

                        var len = d.data.length;
                     

                        for (var i = 0; i < len; i++) {
                            var name = d.data[i].name;
                            var phone = d.data[i].mobileNumber;
                            var department = d.data[i].department;
                            var hospitalxID = d.data[i].hospitalID;
                            var DoctorDataID = d.data[i].doctorDataID;
                            $scope.doctor.push({
                                name: name,
                                phone: phone,
                                department: department,
                                hospitalID: hospitalxID,
                                doctorID: DoctorDataID
                            });
                        }
                        console.log("Succss loadHospital- ", $scope.doctor);

                    }, function (error) {
                        console.log("Oops! Something went wrong while fetching the data.");
                    });
                   
                    $scope.filterExpression = function (doctor) {
                        return (doctor.hospitalID === $scope.Patient.hospital.hospitalID);
                    };

                    //Load Medical History ---------------------------

                    $scope.medHistory = [];
                    var loadMedHistory = logservice.loadMedHistory($scope.id,$scope.traceId,$scope.sessionKey.authKey)
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

 

                }, function (error) {
                    console.log("Oops! Something went wrong while fetching the data.");
                });




 
            }, function (error) {
                console.log("Oops! Something went wrong while fetching the data.");
            });

            //Load Apoinments---------------------------------------------
  
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
