var FoodApp = angular.module('FoodApp', ['ionic', 'FoodApp.controllers']);


FoodApp.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    $rootScope.selectedProducts ={};
    $rootScope.noOfSelectedProducts = 0;
    $rootScope.totalPrice = 0;
})


FoodApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
 
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
 .state('app.cart', {
    parent: 'app',
    url: '/cart',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller: 'cartController'
      }
    }
  })
  .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html'
        }
      }
    })
  
 .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
 .state('app.menus', {
    parent: 'app',
    url: '/menus/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/menus.html',
        controller: 'menusCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/home');
})

FoodApp.factory('Data', function () {
    return { 'selectedProducts': {} };
})
 
.controller('menusCtrl',function($scope,$http,$stateParams,$rootScope) {
    
    
  $http.get('json/menu'+$stateParams.id+'detail.json',{}).success(function(data){
			$scope.products = data;
     
		});
        $scope.myText="Add To Cart";
        
        $scope.changeQuantity = function(product){
            
        event.currentTarget.parentElement.parentElement.classList.remove("activated");
        if(!$rootScope.selectedProducts[product.id])
        {
            
          var a={
            quantity :0 ,
            name: product.name,
            price: product.price,
            id: product.id,
            image:product.image
          };
         $rootScope.selectedProducts[product.id] = a;
        }
           
         $rootScope.selectedProducts[product.id].quantity = product.quantity;
         console.log($rootScope.selectedProducts[product.id].quantity);
        
        if($rootScope.selectedProducts[product.id].quantity == 0)
        {
            delete $rootScope.selectedProducts[product.id];
        }
        $rootScope.noOfSelectedProducts = Object.keys($rootScope.selectedProducts).length;
            
    };

    })

.controller('cartController',function($scope,$rootScope,$http,$location) {
     
    for (i=0;i<Object.keys($rootScope.selectedProducts).length;i++)
    {
        $rootScope.totalPrice = $rootScope.totalPrice+ ($rootScope.selectedProducts[Object.keys($rootScope.selectedProducts)[i]].quantity) * ($rootScope.selectedProducts[Object.keys($rootScope.selectedProducts)[i]].price);
 
    }

      $scope.deleteCheckout = function(product)
      {
         delete $rootScope.selectedProducts[product.id];
         $rootScope.noOfSelectedProducts = Object.keys($rootScope.selectedProducts).length;
      };

      $scope.submitOrder = function()
      {
      };

     
});








