myApp.controller( 'FarmController', [ '$http', '$filter', '$location', 'farmService', function( $http, $filter, $location, farmService ) {
  var vm = this;

  vm.states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL","GA", "HI", "ID", "IL", "IN", "IA","KS","KY","LA","ME","MD","MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM","NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN","TX","UT","VT","VA","WA","WV","WI","WY"];

  vm.getFarmInfo = function(){
    farmService.getFarm().then( function ( data ){
      vm.farm = data;
      console.log("vm.farm-->", vm.farm);
    });
  };

  vm.saveFarm = function() {
    if ( !vm.farm.farm_name || !vm.farm.farm_address || !vm.farm.farm_city || !vm.farm.farm_zip || !vm.farm.farm_state ) {
      swal({
        title: "Empty Fields!",
        text: "Please enter all fields!",
        type: "error",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } else {
      farmService.updateFarm(vm.farm).then(function(){
        swal({
          title: "Farm Updated!",
          type: "success",
          timer: 3500,
          confirmButtonText: "Ok"
        }); // end sweetalert
        vm.getFarmInfo();
      });
    }
  };

  vm.getFarmInfo();

}]);//end FarmController
