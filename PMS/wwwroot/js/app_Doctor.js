(function () {
    'use strict';
    angular.module('APIModule', []);
})();

(function () {
    'use strict';

    angular.module('APIModule').controller('APIController', CoreFunction);

    function CoreFunction() {
        let vm = this,
            addressCollection = [],
            isEditing = false;

        // functions that are not attached to the view model
        let add = function () {
            let isValiForSaving = false;
            for (let propertyName in vm.person) {
                if (vm.person[propertyName].length > 0) {
                    isValiForSaving = true;
                }
            }

            if (isValiForSaving) {
                let newPerson = {};

                if (!angular.equals({}, vm.person)) {
                    if (isEditing !== false) {
                        addressCollection[isEditing] = vm.person;
                        isEditing = false;
                    } else {
                        newPerson = vm.person;
                        addressCollection.push(newPerson);
                    }

                    vm.addresses = addressCollection;
                    vm.person = {};
                }
            }
        },
            edit = function (editPerson) {
                isEditing = addressCollection.indexOf(editPerson);
                vm.person = angular.copy(editPerson);
            },
            remove = function (removePerson) {
                let index = addressCollection.indexOf(removePerson);
                addressCollection.splice(index, 1);
                if (addressCollection.length === 0) {
                    vm.person = {};
                    vm.addresses = undefined;
                }
            },
            reset = function () {
                vm.person = {};
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

        $scope.valueDoctor = false;
        $scope.valuePatient = false;
        

        $scope.sessionKey = $window.SessionKey;

        console.log("sessionKeyMAINMENU", $scope.sessionKey);

        if ($scope.sessionKey.userType === "doctor") {
            $scope.valueDoctor = true;
        }
        console.log("value----", $scope.valueDoctor);
    }
})();
