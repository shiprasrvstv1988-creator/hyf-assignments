console.log("Script loaded");

const products = getAvailableProducts();
//console.log(products);

// This should create the ul and the li's with the individual products details

function renderProducts(products) {
  const productList = document.querySelector(".productList");

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const li = document.createElement("li");

    li.textContent = `${product.name}, Price: ${product.price}, Rating: ${product.rating}`;

    productList.appendChild(li);
  }
}

renderProducts(products);
