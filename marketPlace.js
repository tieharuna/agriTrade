document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length === 0) {
    productList.innerHTML = "<p>No products available at the moment.</p>";
    return;
  }

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
        <h3>${product.name}</h3>
       
        ${
          product.image
            ? `<img src="${product.image}" alt="${product.name}" />`
            : ""
        }
         <p><strong>Price:</strong> ₦${product.price}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Email:</strong> ${product.eMail}</p>
        <p><strong>Contact:</strong> ${product.contact}</p>
      `;

    productList.appendChild(div);
  });
});
