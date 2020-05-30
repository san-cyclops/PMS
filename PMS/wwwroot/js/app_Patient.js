var app = angular.module('apimodule', []);

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
    this.loaddata = function () {
        console.log("GetAllCourseType");
        return $http({
            method: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Data/GetAll?type=CourseType"

        });
    };

});




app.controller('MainCtrl', function ($scope, $http, $window, logservice) {

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
            console.log("loaddata");

            var loadData = logservice.loaddata()
            loadData.then(function (d) {

                console.log("Succss - ", d.data);

                var len = d.data.length;
                console.log("length", d.data.length);
                for (var i = 0; i < len; i++) {
                    console.log(i, "---", d.data[i]);
                    addressCollection.push(d.data[i]);
                }
                vm.addresses = addressCollection;
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
    vm.pageLoad();
});
