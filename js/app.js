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
    $rootScope.canteenid = {};
   

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
  .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html'
        }
      }
    })
  .state('app.log', {
      url: '/log',
      views: {
        'menuContent': {
          templateUrl: 'templates/log.html'
        }
      }
    })
  .state('app.address', {
      url: '/address',
      views: {
        'menuContent': {
          templateUrl: 'templates/address.html',
            controller: 'addressController'
        }
      }
    })
  
 .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
          
        }
      }
    })
  .state('app.first', {
      url: '/first',
      views: {
        'menuContent': {
          templateUrl: 'templates/first.html',
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
  $urlRouterProvider.otherwise('app/home');
})

FoodApp.factory('Data', function () {
    return { 'selectedProducts': {} , 'cantname': {} };
})
 
.controller('homeCtrl', function($scope,$http,$rootScope) {
  
  $http.get('json/canteen.json',{}).success(function(data){
			$scope.cants = data;
      
      for (i=0;i<Object.keys($scope.cants).length;i++)
          {
              $rootScope.canteenid[i]=$scope.cants[i].id;
          }
      
   
              console.log($rootScope.canteenid);
          
		});
  
})

.controller('menusCtrl',function($scope,$http,$stateParams,$rootScope) {
    
    
  $http.get('json/menu'+$stateParams.id+'detail.json',{}).success(function(data){
			$scope.products = data;
      console.log($scope.products);
      });
     
        
        $scope.changeQuantity = function(product)
        {
            
        event.currentTarget.parentElement.parentElement.classList.remove("activated");
        if(!$rootScope.selectedProducts[product.id])
        {
            
          var a={
            cantid :product.cantid ,
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
           $rootScope.totalPrice = $rootScope.totalPrice - ((($rootScope.selectedProducts[product.id]).quantity)*            (($rootScope.selectedProducts[product.id]).price));
          
         delete $rootScope.selectedProducts[product.id];
         $rootScope.noOfSelectedProducts = Object.keys($rootScope.selectedProducts).length;
      };
    
      

     
})
.controller('addressController',function($scope,$rootScope,$http,$location){
    $scope.details = {};
    
    $scope.submitOrder = function(){
        
        
        if($scope.details.name== undefined || $scope.details.phoneNumber == undefined || $scope.details.address == undefined){
            $scope.error = "Please Enter All Mendatory Details";
        }
        else {
        var orderDetails = {selectedProducts:$rootScope.selectedProducts,totalPrice:$rootScope.totalPrice,details:$scope.details};
         console.log($rootScope.selectedProducts);
        var req = {
                            method: 'POST',
                            url: 'register.php',
                            data: {
                                            'username': $scope.details.name,
                                            'useremail': $scope.details.email,
                                            'userphone': $scope.details.phoneNumber,
                                            'useraddress': $scope.details.address,
                                            'canteenid':  $rootScope.canteenid,
                                            'selectedProd':$rootScope.selectedProducts
        
                                  },
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                 };
      
        $http(req).success(function(response){
          console.log(response);
         // $location.path('/app/thankyou')
      })
           
        };
    }
});








