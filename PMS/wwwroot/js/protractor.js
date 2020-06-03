it('should remove the template directive and css class', function () {
    expect($('#template1').getAttribute('ng-cloak')).
        toBeNull();
    expect($('#template2').getAttribute('ng-cloak')).
        toBeNull();
});

/*
Copyright 2020 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/