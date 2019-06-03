function ItemList (CartService) {
  const ctrl = this;
  ctrl.cart= [];


  ctrl.cartData = [
    {
    id:"46",
    product: "cat-food",
    price: "5",
    count: "1",
    },
    {
    id:"1",
    product: "dog-food",
    price: "5",
    count: "2",
    },
    {
    id:"2",
    product: "bird-food",
    price: "10",
    count: "2",
    },
    {
    id:"3",
    product: "fish-food",
    price: "1",
    count: "5",    },
    {
    id:"4",
    product: "turtle-food",
    price: "4",
    count: "2",
 },
 {
  id:"5",
  product: "rabbit-food",
  price: "2",
  count: "1",
}];
  
    // ************************************************
// Shopping Cart API
// ************************************************


// LOADS CART
    ctrl.cartList = () => {
      CartService.getCart()

      .then( (data) => {
        console.log(data);

        data.forEach(function(item) {
          let cartObj = {
            id: item.id,
            product: item.product,
            price: item.price,
            count: item.count,
          }
          ctrl.cart.push(cartObj);
        })

      })

      .catch( (error) => {
        console.log(error);
    })

    }  
  // POST - Adds item to cart
  ctrl.addToCart = (product, price, count) => {
    let item  = {
        product: product,
        price: price,
        count: count,
    }
    CartService.addItem(JSON.stringify(item))
    CartService.reloadData();
}
  

  ctrl.updateCartItem = (count) => {
    let item  = {
        count: count,
    }
    console.log(item.id);

    CartService.updateItem(JSON.stringify(item))
    CartService.reloadData();
}


  ctrl.deleteCartItem = (id) => {
    CartService.removeItem(id);
    console.log('deleted');
}


  ctrl.cartList();
  CartService.getCart()
}

angular.module("CartApp")
.component('cartList', {
    controller: ItemList,
    template: `
    <div class="container">
    <div class="row text-center">

    <h2> Items </h2><br>
    <div class="col" ng-repeat ="cartData in $ctrl.cartData" ng-view="track by item.name">
    <div class="card" style="width: 20rem;">
      <div class="card-block">
        <h5 class="card-title">{{cartData.product}}</h5>
        <p class="card-text"><small class="text-muted">Price: $\{{cartData.price}}</small></p>
        <br>
        <p>count: {{cartData.count}}</p>
        <br>
        <button data-product="{{cartData.product}}" data-price="{{cartData.price}}" class="add-to-cart btn btn-primary" ng-click="$ctrl.addToCart(cartData.product, cartData.price, cartData.count, cartData.image)">Add to cart</button>
    </div>
    

  </div>
  </div>

  <h2> Shopping Cart </h2><br><br><br><br>


  <div class="col" ng-repeat ="cartData in $ctrl.cart" ng-view="track by item.name">
  <div class="card" style="width: 20rem;">
    <div class="card-block">
      
      <h5 class="card-title">{{cartData.product}} #{{cartData.id}}</h5>
      <p class="card-text"><small class="text-muted">Price: $\{{cartData.price}}</small></p>
      <br>
      <p>count: {{cartData.count}}</p>
      <form>
        <input type="number"/>
        <button data-count="{{cartData.count}}" ng-click="$ctrl.updateCartItem(cartData.count)">Update</button>
      </form>
      <br>
      <button data-product="{{cartData.product}}" data-id="{{cartData.id}}" ng-click="$ctrl.deleteCartItem(cartData.id)">Remove</button>
  </div>
  

</div>
</div>
  </div>
  </div> 
    `
})