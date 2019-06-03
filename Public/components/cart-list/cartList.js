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






// // *****************************************
// // Triggers / Events
// // ***************************************** 
// // Add item
// $('.add-to-cart').click(function(event) {
//   event.preventDefault();
//   let product = $(this).data('product');
//   let price = Number($(this).data('price'));
//   shoppingCart.updateCartItem(product, price, 1);
//   displayCart();
// });

// // Clear items
// $('.clear-cart').click(function() {
//   shoppingCart.clearCart();
//   displayCart();
// });


// function displayCart() {
//   let cartArray = shoppingCart.listCart();
//   let output = "";
//   for(let i in cartArray) {
//     output += "<tr>"
//       + "<td>" + cartArray[i].product + "</td>" 
//       + "<td>(" + cartArray[i].price + ")</td>"
//       + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-product=" + cartArray[i].product + ">-</button>"
//       + "<input type='number' class='item-count form-control' data-product='" + cartArray[i].product + "' value='" + cartArray[i].count + "'>"
//       + "<button class='plus-item btn btn-primary input-group-addon' data-product=" + cartArray[i].product + ">+</button></div></td>"
//       + "<td><button class='delete-item btn btn-danger' data-product=" + cartArray[i].product + ">X</button></td>"
//       + " = " 
//       + "<td>" + cartArray[i].total + "</td>" 
//       +  "</tr>";
//   }
//   $('.show-cart').html(output);
//   $('.total-cart').html(shoppingCart.totalCart());
//   $('.total-count').html(shoppingCart.totalCount());


// // Delete item button

// $('.show-cart').on("click", ".delete-item", function(event) {
//   let product = $(this).data('product')
//   shoppingCart.removeItemFromCartAll(product);
//   displayCart();
// })


// // -1
// $('.show-cart').on("click", ".minus-item", function(event) {
//   let product = $(this).data('product')
//   shoppingCart.removeItemFromCart(product);
//   displayCart();
// })
// // +1
// $('.show-cart').on("click", ".plus-item", function(event) {
//   let product = $(this).data('product')
//   shoppingCart.updateCartItem(product);
//   displayCart();
// })

// // Item count input
// $('.show-cart').on("change", ".item-count", function(event) {
//    let product = $(this).data('product');
//    let count = Number($(this).val());
//   shoppingCart.setCountForItem(product, count);
//   displayCart();
// });

// displayCart();




// ctrl.cartList();

 
  // }}
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