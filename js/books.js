// Filter on mobile
let filter = document.querySelectorAll(".filter");

filter.forEach(e => {
    e.addEventListener("click", () => {
        e.classList.toggle("active");
    })
})

// Displaying all books from a JSON file
fetch("json/all.json").then(function(response){
	return response.json();
})
.then(function(products){
	let book = document.querySelector(".books .boxes");
	let out = "";
	for(let product of products){
		out += `
        <div class="swiper-slide box">
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

    book.innerHTML = out;

    isSale();
    ratingSystem(".books .boxes .rating");
        
	}
});

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