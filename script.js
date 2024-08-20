// Global variables
let totalPrice = 0;
let totalPriceDelivery = totalPrice + 9.99;
let cartQuantityNr = 0;
let favsQuantityNr = 0;
let favsQuantitySpan = document.querySelector(".favs-quantity");
let cartQuantitySpan = document.querySelector(".cart-quantity");
let cartQuantitySpanHome = document.querySelector(".cartQuantity");
const totalPriceDiv = document.querySelector(".total-price");
const totalPriceDeliveryDiv = document.querySelector(".total-price-delivery");
const deliveryPriceDiv = document.querySelector(".delivery-price-p");

// Add to cart function
const addCartBtn = (section) => {
  let cartBtn = document.querySelectorAll(section);
  cartBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      const img = btn.parentElement.parentElement.children[0].children[1];
      const title = btn.parentElement.parentElement.children[1];
      const author = btn.parentElement.parentElement.children[2];
      const price = btn.parentElement.parentElement.children[3].children[0];
      const discount = btn.parentElement.parentElement.children[3].children[1];

      let cart = document.querySelector('.cart .items');

      let item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = 
      `
          <div class="image"><img src="${img.src}" alt="${img.src}"></div>
          <div class="item-info">
              <div class="title">${title.textContent}</div>
              <div class="author">${author.textContent}</div>
          </div>
          <div class="price-info">
              <div class="price">${price.textContent}</div>
              <div class="discount">${discount.textContent}</div>
              <div class="delivery">Delivery od 9,99 $</div>
          </div>
          <div class="quantity">
              <div class="minus">-</div>
              <div class="number">1</div>
              <div class="plus">+</div>
          </div>
          <div class="buttons">
              <button class="add-fav-btn"><i class="fa-regular fa-heart"></i></button>
              <button class="rm-item"><i class="fa-regular fa-trash-can"></i></button>
          </div>
      `

    cart.appendChild(item);

    // Showing popup box
    showPopup("cart", "view-cart-btn", "cart", img.src, title, author, price, discount, ".cart");

    // Changing cart quantity in cart
    let cartQuantitySpan = document.querySelector(".cart-quantity");
    let cartQuantitySpanHome = document.querySelector(".cartQuantity");
    cartQuantityNr++;
    console.log(cartQuantityNr);
    cartQuantitySpan.innerHTML = "(" + cartQuantityNr + ")";
    cartQuantitySpanHome.innerHTML = cartQuantityNr;
    cartQuantitySpanHome.style.display = "block";

    // Removing item from cart
    removeCartItem();

    // Clear all cart
    clearAllCart(".clear-cart", ".cart .items .item");

    // Changing item's quantity
    itemQuantitySystem();

    // Checkout calculation
    checkoutCalculation(price);

})
})}

// Add to favs function
const addToFavs = (section) => {
  let favsBtn = document.querySelectorAll(section);
  favsBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      const img = btn.parentElement.parentElement.children[0].children[1];
      const title = btn.parentElement.parentElement.children[1];
      const author = btn.parentElement.parentElement.children[2];
      const price = btn.parentElement.parentElement.children[3].children[0];
      const discount = btn.parentElement.parentElement.children[3].children[1];

      let favs = document.querySelector('.cart.favs .items');

      let item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = 
      `
      <div class="image"><img src="${img.src}" alt="${img.src}"></div>
      <div class="item-info">
          <div class="title">${title.textContent}</div>
          <div class="author">${author.textContent}</div>
      </div>
      <div class="price-info">
        <div class="price">${price.textContent}</div>
        <div class="discount">${discount.textContent}</div>
        <div class="delivery">Delivery od 9,99 $</div>
      </div>
      <div class="buttons">
          <button><i class="fa-solid fa-cart-plus"></i></button>
          <button class="rm-item"><i class="fa-regular fa-trash-can"></i></button>
      </div>
      `

    favs.appendChild(item);
    btn.style.background = "#fe5a5a";
    btn.style.display = "block";
    
    showPopup("favorites", "view-cart-btn", "favorites", img.src, title, author, price, discount, ".favs");

    // Changing favs quantity
    favsQuantityNr++;
    favsQuantitySpan.innerHTML = "(" + favsQuantityNr + ")";

    // Removing item from cart
    removeCartItem();

    // Changing item's quantity
    itemQuantitySystem();

    // Clear all cart
    clearAllCart(".clear-favs", ".cart.favs .items .item");
})
})}

// Checkout calculation function
const checkoutCalculation = (priceCalc) => {
  priceCalc = parseFloat(priceCalc.textContent);
  totalPrice += priceCalc;
  totalPriceDelivery += priceCalc;
  totalPriceDiv.innerHTML = totalPrice.toFixed(2) + " $";
  totalPriceDeliveryDiv.innerHTML = totalPriceDelivery.toFixed(2) + " $";
  deliveryPriceDiv.innerHTML = 9.99 + " $";
}

const showPopup = (message, btnClass, btnContent, img, title, author, price, discount, list) => {
// Added to cart popup message
const cartPopup = document.createElement("div");
cartPopup.classList.add("cart-popup");
cartPopup.innerHTML = 
`
  <div class="cart-popup-wrapper">
    <div class="heading">
        <h1>Product added to your ${message}!</h1>
        <button class="close-popup-btn"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="product-box">
        <div class="image"><img src="${img}" alt="${img}"></div>
        <div class="product-info">
            <div class="title">${title.textContent}</div>
            <div class="author">${author.textContent}</div>
            <div class="price-info">
                <div class="price">${price.textContent}</div>
                <div class="discount">${discount.textContent}</div>
            </div>
            <div class="buttons">
                <button class="${btnClass}">View ${btnContent}</button>
                <button class="continue-shopping-btn">Continue shopping</button>
            </div>
        </div>
      </div>
  </div>
`

document.body.appendChild(cartPopup);

// Closing popup message
closePopup();

// Viewing cart/favorites
const viewCartBtn = cartPopup.querySelector(".view-cart-btn");
const shoppingCart = document.querySelector(list);
viewCartBtn.addEventListener("click", () => {
  shoppingCart.classList.add("active");
})
}

const closePopup = () => {
  const closePopupBtn = document.querySelector(".close-popup-btn");
  const cartpopup = document.querySelector(".cart-popup");
  closePopupBtn.addEventListener("click", () => {
    cartpopup.remove();
  })
}

// Removing item from cart
const removeCartItem = () => {
  let removeCartItemBtn = document.querySelectorAll(".cart .rm-item");
  removeCartItemBtn.forEach(e => {
    e.addEventListener("click", () => {
      cartQuantityNr--;
      console.log(cartQuantityNr);
      favsQuantityNr--;
      cartQuantitySpan.innerHTML = "(" + cartQuantityNr + ")";
      cartQuantitySpanHome.innerHTML = cartQuantityNr;
      favsQuantitySpan.innerHTML = favsQuantityNr;
      e.parentElement.parentElement.remove();
    })
  })
}

// Quantity system
const itemQuantitySystem = () => {
  for (const systemElement of document.querySelectorAll(".quantity")) {
    const number = systemElement.querySelector(".number");
    const minus = systemElement.querySelector(".minus");
    const plus = systemElement.querySelector(".plus");
    
    let quantity = parseInt(number.textContent);
  
    plus.addEventListener("click", () => {
      quantity++;
      number.textContent = quantity;
    });
  
    minus.addEventListener("click", () => {
      if (quantity < 2) {
        quantity = 1;
        number.textContent = quantity;
      } else {
        quantity--;
        number.textContent = quantity;
      }
    });
  }
}

// Rating system
const ratingSystem = (section) => {
  let rate = document.querySelectorAll(section);
  rate.forEach(rt => {
    let nr = rt.innerText;
    let icon = '<i class="fa-solid fa-star"></i>';
    let result = icon.repeat(nr);
    rt.innerHTML = result;
  })
  
}

// isSale function
function isSale() {
  let sale = document.querySelectorAll(".sale");
  sale.forEach(pr => {
    if (pr.innerText === "") {
      pr.style.display = "none";
    }
  }) 
}

// Clearing all items from cart
const clearAllCart = (button, section) => {
  const clearAllCartBtn = document.querySelector(button);
  clearAllCartBtn.addEventListener("click", () => {
    cartQuantityNr = 0;
    favsQuantityNr = 0;
    favsQuantitySpan.innerHTML = "";
    cartQuantitySpan.innerHTML = "";
    cartQuantitySpanHome.innerHTML = "";
    cartQuantitySpanHome.style.display = "none";
    totalPriceDiv.innerHTML = "";
    totalPriceDeliveryDiv.innerHTML = "";
    deliveryPriceDiv.innerHTML = "";
    let items = document.querySelectorAll(section);
    items.forEach((item) => {
      item.remove();
    })
  })
}

// Showing books function
function showBooks(file, section, favs, cart, rating) {
  fetch(file).then(function(response){
    return response.json();
  })
  .then(function(products){
    let book = document.querySelector(section);
    let out = "";
  
    for(let product of products){
      out += `
              <div class="box swiper-slide">
                <div class="image">
                    <div class="sale">${product.sale}</div>
                    <img src="${product.img}" alt="${product.author}/${product.title}">
                    <div class="add-favs-btn"><i class="fa-solid fa-heart-circle-plus"></i></div>
                </div>
                <div class="title">${product.title}</div>
                <div class="author">${product.author}</div>
                <div class="price-info">
                  <div class="price">${product.price}</div>
                  <div class="discount">${product.discount}</div>
                </div>
                <div class="rating">${product.rating}</div>
                <div class="btn"><button class="add-cart-btn"><i class="fa-solid fa-cart-plus"></i> Add to cart</button></div>
            </div>
      `;
  
      book.innerHTML = out;
  
      addToFavs(favs);
      addCartBtn(cart);
      ratingSystem(rating);
      isSale();
    }
  });
}
showBooks("./json/recommended.json", "#recommended .swiper-wrapper", "#recommended .add-favs-btn", "#recommended .add-cart-btn", "#recommended .rating");
showBooks("./json/news.json", "#news .swiper-wrapper", "#news .add-favs-btn", "#news .add-cart-btn", "#news .rating");
showBooks("./json/sale.json", "#sale .swiper-wrapper", "#sale .add-favs-btn", "#sale .add-cart-btn", "#sale .rating");


// Viewing shopping cart
const cartLinkBtn = document.querySelectorAll(".cart-btn");
cartLinkBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let cart = document.querySelector('.cart');
    cart.classList.toggle("active");
  })
})

// Closing shopping cart
const closeCartBtn = document.querySelector(".close-cart");
closeCartBtn.addEventListener("click", () => {
  let cart = document.querySelector('.cart');
  cart.classList.remove("active");
})

// Viewing favorites list
const favsLinkBtn = document.querySelectorAll(".favs-btn");
favsLinkBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let favs = document.querySelector('.cart.favs');
    favs.classList.toggle("active");
  })
})

// Closing favorites list
const closeFavsBtn = document.querySelector(".close-favs");
closeFavsBtn.addEventListener("click", () => {
  let favs = document.querySelector('.cart.favs');
  favs.classList.remove("active");
})


// Books - Swiper
const books = new Swiper('.book-swiper', {
  slidesPerView: 6,
  slidesPerGroup: 1,
  grabCursor: 'true',
  spaceBetween: 20,
  fade: 'true',
  centerSlide: 'true',
  direction: 'horizontal',

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 6,
    },
  }
});