myApp.service('harvestService', ['$http', '$location', function($http, $location) {
  var self = this;

  self.harvest = { list: [] };

  self.addHarvest = function(harvestToSend){
    console.log('in addHarvest service with harvestToSend-->', harvestToSend);
    return $http({
      method:'POST',
      url:'/planner/addHarvest',
      data: harvestToSend,
    }).then(function( response ) {
      console.log('in service for addHarvest with response-->', response );
      // self.getHarvest();
      self.getHarvestAndCrop();
      return response;
    }, function error ( response ){
      console.log( 'Error in addHarvest:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end POST '/planner/addPlant'
  };//end addPlant POST

  // self.getHarvest = function () {
  //   console.log('in getHarvest service');
  //   $http ({
  //     method: 'GET',
  //     url: '/planner/Harvest',
  //   }).then( function (response) {
  //     console.log( 'getHarvest resp:', response.data );
  //     self.harvest.list = response.data;
  //   }, function error ( response ){
  //     console.log( 'Error in getHarvest:', response );
  //     if ( response.status === 403 ) {
  //       $location.path( '/' );
  //     }
  //   }); // end getPlants
  // };//end getPlant GET
  //
  // self.getHarvest();

  self.getHarvestAndCrop = function () {
    console.log('in getHarvestAndCrop service');
    $http ({
      method: 'GET',
      url: '/planner/HarvestAndCrop',
    }).then( function (response) {
      console.log( 'getHarvestAndCrop resp:', response.data );
      self.harvest.list = response.data;
    }, function error ( response ){
      console.log( 'Error in getHarvest:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end getPlants
  };//end getPlant GET

  self.getHarvestAndCrop();

  self.updateHarvest = function (harvestToUpdate) {
    console.log('in updateHarvest service with harvestToUpdate-->', harvestToUpdate);
    return $http({
      method:'PUT',
      url:'/planner/updateHarvest',
      data: harvestToUpdate,
    }).then(function( response ) {
      console.log('in service for updateHarvest with response-->', response );
      self.getHarvestAndCrop();
      return response;
    }, function error ( response ){
      console.log( 'Error in updateSale:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end POST
  };

  }]);
