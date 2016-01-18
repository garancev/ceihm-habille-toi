'use strict';

/**
 * @ngdoc function
 * @name habilleToiApp.controller:HabilleCtrl
 * @description
 * # HabilleCtrl
 * Controller of the habilleToiApp
 */
angular.module('habilleToiApp')
  .controller('HabilleCtrl', function ($scope, Saisons, Mannequins, Sousvetements, Hauts, Bas, Vests, Chaussures, Accessoires, $routeParams, $document) {

    $scope.saison = Saisons.get($routeParams.saisonId);
    $scope.mannequin = Mannequins.get($routeParams.mannequinId);
    $scope.sousvetements = Sousvetements.all();
    $scope.hauts = Hauts.all();
    $scope.bas = Bas.all();
    $scope.vests = Vests.all();
    $scope.chaussures = Chaussures.all();
    $scope.accessoires = Accessoires.all();

    $scope.audio_bad = new Audio('../../sounds/bad.mp3');


    $scope.newUnderwear = function (clothesJSON) {
      if ($scope.mannequin.ident == 'naked') {
        //dress
        if (clothesJSON.ident == 'bra' || clothesJSON.ident == 'socks' || clothesJSON.ident == 'panties') {
          $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
          //Enlever le croix rouge quand choisir un bon vetement
          angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
          findAndRemove($scope.sousvetements, 'ident', clothesJSON.ident);
        }
        else {
          $scope.audio_bad.play();
          findAndFilter($scope.sousvetements, 'ident', clothesJSON.ident);
        }
      }
      else if ($scope.mannequin.ident == 'bra') {
        //dress
        if (clothesJSON.ident == 'socks' || clothesJSON.ident == 'panties') {
          $scope.mannequin = Mannequins.getIdent('bra' + clothesJSON.ident);
          //Enlever le croix rouge quand choisir un bon vetement
          angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
          findAndRemove($scope.sousvetements, 'ident', clothesJSON.ident);
        }
        else {
          //error
          $scope.audio_bad.play();
          findAndFilter($scope.sousvetements, 'ident', clothesJSON.ident);
        }
      }
      else if ($scope.mannequin.ident == 'panties') {
        //dress
        if (clothesJSON.ident == 'socks' || clothesJSON.ident == 'bra') {
          $scope.mannequin = Mannequins.getIdent(clothesJSON.ident + 'panties');
          //Enlever le croix rouge quand choisir un bon vetement
          angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
          findAndRemove($scope.sousvetements, 'ident', clothesJSON.ident);
        }
        else {
          //error
          $scope.audio_bad.play();
          findAndFilter($scope.sousvetements, 'ident', clothesJSON.ident);
        }
      }
      else if ($scope.mannequin.ident == 'socks') {
        if (clothesJSON.ident == 'bra') {
          $scope.mannequin = Mannequins.getIdent(clothesJSON.ident + 'socks');
          //Enlever le croix rouge quand choisir un bon vetement
          angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
          findAndRemove($scope.sousvetements, 'ident', clothesJSON.ident);
        }
        else if (clothesJSON.ident == 'panties') {
          $scope.mannequin = Mannequins.getIdent('socks' + clothesJSON.ident);
        }
        else {
          //error
          $scope.audio_bad.play();
          findAndFilter($scope.sousvetements, 'ident', clothesJSON.ident);
        }
      }
      else if ($scope.mannequin.ident == 'brasocks' ) {
        //if panties go underwear
        if (clothesJSON.ident == 'panties') {
          $scope.mannequin = Mannequins.getIdent('underwear');
          //Enlever le croix rouge quand choisir un bon vetement
          angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
          findAndRemove($scope.sousvetements, 'ident', clothesJSON.ident);
        }
        else {
          //error
          $scope.audio_bad.play();
          findAndFilter($scope.sousvetements, 'ident', clothesJSON.ident);
        }
      }
      else if  ($scope.mannequin.ident == 'sockspanties' ) {
        //if bra go underwear
        if (clothesJSON.ident == 'bra') {
          $scope.mannequin = Mannequins.getIdent('underwear');
          //Enlever le croix rouge quand choisir un bon vetement
          angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
          findAndRemove($scope.sousvetements, 'ident', clothesJSON.ident);
        }
        else {
          //error
          $scope.audio_bad.play();
          findAndFilter($scope.sousvetements, 'ident', clothesJSON.ident);
        }
      }
      else if  ($scope.mannequin.ident == 'brapanties' ) {
        //if socks go underwear
        if (clothesJSON.ident == 'socks') {
          $scope.mannequin = Mannequins.getIdent('underwear');
          //Enlever le croix rouge quand choisir un bon vetement
          angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
          findAndRemove($scope.sousvetements, 'ident', clothesJSON.ident);
        }
        else {
          //error
          $scope.audio_bad.play();
          findAndFilter($scope.sousvetements, 'ident', clothesJSON.ident);
        }
      }
      else {
        //error
        $scope.audio_bad.play();
        findAndFilter($scope.sousvetements, 'ident', clothesJSON.ident);
      }
    };


$scope.newShirt = function (clothesJSON) {
  console.log('you clicked on a shirt');
  if ($scope.mannequin.ident == 'underwear') {
    // if underwear go shirt
    if (clothesJSON.ident == 'underwearshirt') {
      $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
      angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
      findAndRemove($scope.hauts, 'ident', clothesJSON.ident);
    }
    else {
      $scope.audio_bad.play();
      findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
    }
  }
  else if ($scope.mannequin.ident == 'bra') {
    //if bra go shirt
    if (clothesJSON.ident == 'brashirt') {
      $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
      angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
      findAndRemove($scope.hauts, 'ident', clothesJSON.ident);
    }
    else {
      $scope.audio_bad.play();
      findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
    }
  }
  else if ($scope.mannequin.ident == 'brapanties') {
    //if bra + panties go shirt
    if (clothesJSON.ident == 'brapantiesshirt') {
      $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
      angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
      findAndRemove($scope.hauts, 'ident', clothesJSON.ident);
    }
    else {
      $scope.audio_bad.play();
      findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
    }
  }
  else if ($scope.mannequin.ident == 'brasocks') {
    // ig bra + socks go shirt
    if (clothesJSON.ident == 'brasocksshirt') {
      $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
      angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
      findAndRemove($scope.hauts, 'ident', clothesJSON.ident);
    }
    else {
      $scope.audio_bad.play();
      findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
    }
  }
  else if ($scope.mannequin.ident.match("shirt$")) {
    //if anything + shirt go anything + pullover
    if (clothesJSON.ident.match("pullover$")) {
      $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
      angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
      findAndRemove($scope.hauts, 'ident', clothesJSON.ident);
    }
    else {
      $scope.audio_bad.play();
      findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
    }
  }
  else {
    $scope.audio_bad.play();
    findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
  }

};

$scope.newPants = function (clothesJSON) {
  console.log('you clicked on a pants');
  if ($scope.mannequin.ident == 'panties') {
    // if underwear go shirt
    if (clothesJSON.ident == 'pantiespants') {
      $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
      angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
      findAndRemove($scope.hauts, 'ident', clothesJSON.ident);
    }
    else {
      $scope.audio_bad.play();
      findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
    }
  }
  else if ($scope.mannequin.ident == 'sockspanties') {
    // if underwear go shirt
    if (clothesJSON.ident == 'sockspantiespants') {
      $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
      angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
      findAndRemove($scope.hauts, 'ident', clothesJSON.ident);
    }
    else {
      $scope.audio_bad.play();
      findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
    }
  }
  else if ($scope.mannequin.ident == 'brapanties') {
    // if underwear go shirt
    if (clothesJSON.ident == 'brapantiespants') {
      $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
      angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
      findAndRemove($scope.hauts, 'ident', clothesJSON.ident);
    }
    else {
      $scope.audio_bad.play();
      findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
    }
  }
  else if ($scope.mannequin.ident == 'underwear') {
    // if underwear go shirt
    if (clothesJSON.ident == 'underwearpants') {
      $scope.mannequin = Mannequins.getIdent(clothesJSON.ident);
      angular.element($document[0].getElementsByClassName('croix-rouge')).addClass('hidden');
      findAndRemove($scope.hauts, 'ident', clothesJSON.ident);
    }
    else {
      $scope.audio_bad.play();
      findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
    }
  }
  else {
    $scope.audio_bad.play();
    findAndFilter($scope.hauts, 'ident', clothesJSON.ident);
  }
}

function findAndRemove(array, property, value) {
  array.forEach(function (result, index) {
    if (result[property] === value) {
      //Remove from array
      array.splice(index, 1);
    }
  });
}


$scope.resetClothes = function () {
  $scope.sousvetements = Sousvetements.all();
  $scope.hauts = Hauts.all();
  $scope.bas = Bas.all();
  $scope.vests = Vests.all();
  $scope.chaussures = Chaussures.all();
  $scope.accessoires = Accessoires.all();
  $scope.mannequin = Mannequins.get($routeParams.mannequinId);
};


function findAndFilter(array, property, value) {
  array.forEach(function (result, index) {
    if (result[property] === value) {
      //gray the chosen image
      angular.element($document[0].getElementById(result[property])).removeClass('hidden');
    }
  });
}
})
;
