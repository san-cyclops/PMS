(function () {
    'use strict';
    angular.module('APIModule', []);
})();

(function () {
    'use strict';

    angular.module('APIModule').controller('APIController', CoreFunction);

    function CoreFunction($scope, $window) {
        let vm = this,
            addressCollection = [],
            isEditing = false;

        // functions that are not attached to the view model
        let add = function () {
            let isValiForSaving = false;
            for (let propertyName in vm.Doctor) {
                if (vm.Doctor[propertyName].length > 0) {
                    isValiForSaving = true;
                }
            }

            if (isValiForSaving) {
                let newPerson = {};

                if (!angular.equals({}, vm.Doctor)) {
                    if (isEditing !== false) {
                        addressCollection[isEditing] = vm.Doctor;
                        isEditing = false;
                    } else {
                        newPerson = vm.Doctor;
                        addressCollection.push(newPerson);
                    }

                    vm.addresses = addressCollection;
                    vm.Doctor = {};
                }
            }
        },
            edit = function (editPerson) {
                isEditing = addressCollection.indexOf(editPerson);
                vm.Doctor = angular.copy(editPerson);
            },
            remove = function (removePerson) {
                let index = addressCollection.indexOf(removePerson);
                addressCollection.splice(index, 1);
                if (addressCollection.length === 0) {
                    vm.Doctor = {};
                    vm.addresses = undefined;
                }
            },
            reset = function () {
                vm.Doctor = {};
                vm.search = '';
                isEditing = false;
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


        $scope.dateOptions = {
            dateFormat: 'dd/mm/yy',
        }

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
    }
})();
