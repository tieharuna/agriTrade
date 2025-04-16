document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("categoryFilter");
  const searchInput = document.getElementById("searchInput");
  const productList = document.getElementById("marketProductList");

  //original
  function loadAndDisplayProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const filteredProducts = products.filter((product) => {
      const categoryMatch =
        categoryFilter.value === "All" ||
        (product.category && product.category === categoryFilter.value);

      const searchMatch =
        product.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchInput.value.toLowerCase());

      return categoryMatch && searchMatch;
    });

    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
      productList.innerHTML = "<p>No matching products found.</p>";
      return;
    }

    filteredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
          <h3>${product.name}</h3>
          ${
            product.image
              ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 200px;" />`
              : ""
          }
          <p><strong>Price:</strong> ${product.price}</p>
          <p>${product.description}</p>
          <p><strong>Email:</strong> ${product.eMail}</p>
          <p><strong>Contact:</strong> ${product.contact}</p>
          <p><strong>Location: </strong>${product.productLocation}</p>
        `;

      productList.appendChild(card);
    });
  }

  categoryFilter.addEventListener("change", loadAndDisplayProducts);
  searchInput.addEventListener("input", loadAndDisplayProducts);

  loadAndDisplayProducts();
});
