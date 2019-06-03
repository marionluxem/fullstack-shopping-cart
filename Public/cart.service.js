function CartService($http, $q, $window) {
    const service = this;

  // this displays all items in the cart

  service.getCart = () => {
    return $q(function(resolve, reject) {
      $http.get('/cart-items') 
        .then( (response) => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch( (err) => {
          console.error(err);
          reject(err);
        })
    })
  } 

 // REMOVES ITEM FROM CART - BASED ON USER INPUT

 service.removeItem = (id) => {
    return $http({
      url: `/cart-items/${id}`,
      method: "DELETE",
      data: id
    }).then((response) => {
      console.log(id);
      return response.data;
    });
  }

  // ADDS ITEM TO CART - BASED ON USER INPUT FROM FORM

  service.addItem = (item) => {
    return $http({
      url: "/cart-items",
      method: "POST",
      data: item
    }).then((response) => {
      return response.data;
    });
  }

  // UPDATES THE CART - BASED ON USER INPUT

  service.updateItem = (item, id) => {
    return $http({
      url: "/cart-items/" + id,
      method: "PUT",
      data: item
    }).then((response) => {
      return response.data;
    });
  }

  service.reloadData = function () {
    $window.location.reload();
}

}


angular.module("CartApp")
.service("CartService", ["$http", "$q", "$window", CartService]);