angular.module('organization')
.controller('userDetailsCtrl', ['$scope','$stateParams','API','Timezones','UserProfile','$q',
function($scope,$stateParams,API,Timezones,UserProfile,$q) {
    'use strict';

    const userDetails = this,
        userID = $stateParams.userId,
        organizationID = $stateParams.orgId;

    let apiPromises = [];

    userDetails.loading = true;
    userDetails.profileRolesSwitch = true;
    userDetails.appsHistorySwitch = true;
    UserProfile.injectUI(userDetails, $scope);


    // HELPER FUNCTIONS START ------------------------------------------------------------------------
    // HELPER FUNCTIONS END --------------------------------------------------------------------------

    // ON LOAD START ---------------------------------------------------------------------------------

    apiPromises.push(
        UserProfile.getProfile({personId: userID})
        .then(function(res) {
            angular.merge(userDetails, res);
        }, function(error) {
            console.log(error);
        })
    );

    apiPromises.push(
        API.cui.getOrganization({organizationId: organizationID})
        .then(function(res) {
            userDetails.organization = res;
        }, function(error) {
            console.log(error);
        })
    );

    $q.all(apiPromises)
    .then(function(res) {
        userDetails.loading = false;
    })
    .catch(function(error) {
        userDetails.loading = false;
        console.log(error);
    });

    // ON LOAD END -----------------------------------------------------------------------------------

}]);
