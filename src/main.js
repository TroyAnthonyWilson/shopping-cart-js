let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x)=>{
    let{id, name, price, desc, img} =x
    let search = basket.find(s => s.id === id) || [];
    return `
    <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="" onclick="increment(${id})">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$${price}</h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">
            ${search.item === undefined? 0: search.item}
            </div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>`;
  }).join(""));
};

generateShop();

function increment(id){
  let selectedItem = id;
  let search = basket.find(s => s.id === selectedItem.id);

  if(search === undefined){
     basket.push({
    id: selectedItem.id,
    item: 1, 
  });
  }
  else{
    search.item += 1;
  }
  update(selectedItem.id);
}

function decrement(id){
  let selectedItem = id;
  let search = basket.find(s => s.id === selectedItem.id);

  if(search === undefined) return;
  else if(search.item === 0) return;
  else{
    search.item -= 1;
  }
  update(selectedItem.id);
}

function update(id){
  let search = basket.find(s => s.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  basket = basket.filter(f => f.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

function calculation(){
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map(m => m.item).reduce((x,y) => x+y,0)
}

calculation();