// Initialize total price variables
let totalPrice = 0;
let totalPriceDelivery = 9.99; // Initialize delivery cost directly
let cartQuantityNr = 0;
let favsQuantityNr = 0;
const favsQuantitySpan = document.querySelector(".favs-quantity");
const cartQuantitySpan = document.querySelector(".cart-quantity");
const cartQuantitySpanHome = document.querySelector(".cartQuantity");
const totalPriceDiv = document.querySelector(".total-price");
const totalPriceDeliveryDiv = document.querySelector(".total-price-delivery");
const deliveryPriceDiv = document.querySelector(".delivery-price-p");

// Add to cart function
const addCartBtn = (section) => {
  document.querySelectorAll(section).forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest('.box');
      const img = parent.querySelector('.image img');
      const title = parent.querySelector('.title');
      const author = parent.querySelector('.author');
      const price = parent.querySelector('.price');
      const discount = parent.querySelector('.discount');

      let cart = document.querySelector('.cart .items');
      let item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = 
      `
          <div class="image"><img src="${img.src}" alt="${img.alt}"></div>
          <div class="item-info">
              <div class="title">${title.textContent}</div>
              <div class="author">${author.textContent}</div>
          </div>
          <div class="price-info">
              <div class="price">${price.textContent}</div>
              <div class="discount">${discount.textContent}</div>
              <div class="delivery">Delivery from 9.99 $</div>
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
      `;
      cart.appendChild(item);

      // Show popup box
      showPopup("cart", "view-cart-btn", "cart", img.src, title, author, price.textContent, discount.textContent, ".cart");

      // Update cart quantity
      cartQuantityNr++;
      cartQuantitySpan.innerHTML = `(${cartQuantityNr})`;
      cartQuantitySpanHome.innerHTML = cartQuantityNr;
      cartQuantitySpanHome.style.display = "block";

      // Removing item from cart
      removeCartItem();

      // Clear all cart
      clearAllCart(".clear-cart", ".cart .items .item");

      // Update item quantity
      itemQuantitySystem();

      // Checkout calculation
      checkoutCalculation(parseFloat(price.textContent), 1);
    });
  });
}

// Add to favs function
const addToFavs = (section) => {
  document.querySelectorAll(section).forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest('.box');
      const img = parent.querySelector('.image img');
      const title = parent.querySelector('.title');
      const author = parent.querySelector('.author');
      const price = parent.querySelector('.price');
      const discount = parent.querySelector('.discount');

      let favs = document.querySelector('.cart.favs .items');
      let item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = 
      `
      <div class="image"><img src="${img.src}" alt="${img.alt}"></div>
      <div class="item-info">
          <div class="title">${title.textContent}</div>
          <div class="author">${author.textContent}</div>
      </div>
      <div class="price-info">
        <div class="price">${price.textContent}</div>
        <div class="discount">${discount.textContent}</div>
        <div class="delivery">Delivery from 9.99 $</div>
      </div>
      <div class="buttons">
          <button><i class="fa-solid fa-cart-plus"></i></button>
          <button class="rm-item"><i class="fa-regular fa-trash-can"></i></button>
      </div>
      `;
      favs.appendChild(item);
      btn.style.background = "#fe5a5a";
      btn.style.display = "block";
      
      showPopup("favorites", "view-cart-btn", "favorites", img.src, title, author, price.textContent, discount.textContent, ".favs");

      // Update favs quantity
      favsQuantityNr++;
      favsQuantitySpan.innerHTML = `(${favsQuantityNr})`;

      // Removing item from cart
      removeCartItem();

      // Update item quantity
      itemQuantitySystem();

      // Clear all favs
      clearAllCart(".clear-favs", ".cart.favs .items .item");
    });
  });
}

// Checkout calculation function
const checkoutCalculation = (price, quantity) => {
    totalPrice += price * quantity;
    totalPriceDelivery = totalPrice + 9.99; // Adding delivery cost of $9.99

    // Update DOM elements with new values
    totalPriceDiv.innerHTML = totalPrice.toFixed(2) + "$";
    totalPriceDeliveryDiv.innerHTML = totalPriceDelivery.toFixed(2) + "$";
    deliveryPriceDiv.innerHTML = "9.99$";
}

// Function to show the popup
const showPopup = (message, btnClass, btnContent, img, title, author, price, discount, list) => {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
      <div class="cart-popup">
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
                    <div class="price">${price}</div>
                    <div class="discount">${discount}</div>
                </div>
                <div class="buttons">
                    <button class="${btnClass}">View ${btnContent}</button>
                    <button class="continue-shopping-btn">Continue shopping</button>
                </div>
            </div>
        </div>
      </div>
    `;
    document.body.appendChild(popup);

    // Close popup
    closePopup();

    // View cart/favorites button
    const viewCartBtn = popup.querySelector(`.${btnClass}`);
    const shoppingCart = document.querySelector(list);
    viewCartBtn.addEventListener("click", () => {
      shoppingCart.classList.add("active");
    });
}

// Function to close popup
const closePopup = () => {
    document.body.addEventListener('click', (event) => {
        if (event.target.matches('.close-popup-btn')) {
            event.target.closest('.popup').remove();
        }
    });
}

// Removing item from cart
const removeCartItem = () => {
    document.querySelectorAll(".cart .rm-item").forEach(e => {
        e.addEventListener("click", () => {
            cartQuantityNr--;
            favsQuantityNr--;
            cartQuantitySpan.innerHTML = `(${cartQuantityNr})`;
            cartQuantitySpanHome.innerHTML = cartQuantityNr;
            favsQuantitySpan.innerHTML = favsQuantityNr;
            e.closest('.item').remove();
        });
    });
}

// Quantity system
const itemQuantitySystem = () => {
    document.querySelectorAll(".quantity").forEach(systemElement => {
        const number = systemElement.querySelector(".number");
        const minus = systemElement.querySelector(".minus");
        const plus = systemElement.querySelector(".plus");
        
        let quantity = parseInt(number.textContent, 10);
    
        plus.addEventListener("click", () => {
            quantity++;
            number.textContent = quantity;
        });
    
        minus.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                number.textContent = quantity;
            }
        });
    });
}

// Rating system
const ratingSystem = (section) => {
    document.querySelectorAll(section).forEach(rt => {
        const nr = parseInt(rt.innerText, 10);
        const icon = '<i class="fa-solid fa-star"></i>';
        rt.innerHTML = icon.repeat(nr);
    });
}

// isSale function
const isSale = () => {
    document.querySelectorAll(".sale").forEach(pr => {
        if (pr.innerText.trim() === "") {
            pr.style.display = "none";
        }
    });
}

// Clearing all items from cart
const clearAllCart = (button, section) => {
    document.querySelector(button).addEventListener("click", () => {
        cartQuantityNr = 0;
        favsQuantityNr = 0;
        favsQuantitySpan.innerHTML = "";
        cartQuantitySpan.innerHTML = "";
        cartQuantitySpanHome.innerHTML = "";
        cartQuantitySpanHome.style.display = "none";
        totalPriceDiv.innerHTML = "";
        totalPriceDeliveryDiv.innerHTML = "";
        deliveryPriceDiv.innerHTML = "";
        document.querySelectorAll(section).forEach(item => item.remove());
    });
}

// Showing books function
const showBooks = (file, section, favs, cart, rating) => {
    fetch(file)
        .then(response => response.json())
        .then(products => {
            const book = document.querySelector(section);
            let out = "";

            products.forEach(product => {
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
                        <div class="btn"><button class="add-cart-btn"><i class="fa-solid fa-cart-plus"></i>Add to cart</button></div>
                    </div>
                `;
            });

            book.innerHTML = out;
            addToFavs(favs);
            addCartBtn(cart);
            ratingSystem(rating);
            isSale();
        });
}

showBooks("./json/recommended.json", "#recommended .swiper-wrapper", "#recommended .add-favs-btn", "#recommended .add-cart-btn", "#recommended .rating");
showBooks("./json/news.json", "#news .swiper-wrapper", "#news .add-favs-btn", "#news .add-cart-btn", "#news .rating");
showBooks("./json/sale.json", "#sale .swiper-wrapper", "#sale .add-favs-btn", "#sale .add-cart-btn", "#sale .rating");

// Viewing shopping cart
document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector('.cart').classList.toggle("active");
    });
});

// Closing shopping cart
document.querySelector(".close-cart").addEventListener("click", () => {
    document.querySelector('.cart').classList.remove("active");
});

// Viewing favorites list
document.querySelectorAll(".favs-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector('.cart.favs').classList.toggle("active");
    });
});

// Closing favorites list
document.querySelector(".close-favs").addEventListener("click", () => {
    document.querySelector('.cart.favs').classList.remove("active");
});

// Books - Swiper
const books = new Swiper('.book-swiper', {
    slidesPerView: 6,
    slidesPerGroup: 1,
    grabCursor: true,
    spaceBetween: 20,
    fade: true,
    centerSlide: true,
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