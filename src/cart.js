let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((m) => m.item).reduce((x,y) => x+y,0)
}

calculation();

let generateCartItems = () => {
  if(basket.length !== 0){
    return (shoppingCart.innerHTML = basket.map((c) => {
      console.log(c);
      let {id, item } = c;
      let search = shopItemsData.find((y) => y.id === id) || []
      return `
      <div class="cart-item">
        <img width="100" src=${search.img} alt="">
        <div class="details">
        <div class="title-price-x">
          <h4>
            <p>${search.name}</p>
            <p>$ ${search.price}</p>
          </h4>
          <i class="bi bi-bag-x"></i>
        </div>

        <div class="cart-buttons"></div>

        <h3></h3>
        </div>
        </div>
      `
    }).join(""));
  }
  else{
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>The cart is empty</h2>
    <a href="index.html">
    <button class="HomeBtn">Back to store</button>
    </a>
    `;
  }
};

generateCartItems();