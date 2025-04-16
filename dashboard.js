document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("productList");

  // Load products on page load
  loadProducts();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;
    const eMail = document.getElementById("mail").value;
    const contact = document.querySelector(".contact").value;
    const imageInput = document.getElementById("productImage");
    const imageFile = imageInput.files[0];

    if (!name || !price || !description || !eMail || !contact) {
      alert("Please fill all the fields.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      const imageURL = event.target.result;

      const newProduct = {
        id: Date.now(),
        name,
        price,
        description,
        eMail,
        contact,
        image: imageURL,
      };

      // Get existing products
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));

      form.reset();
      loadProducts();
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      // If no image, just save without one
      const newProduct = {
        id: Date.now(),
        name,
        price,
        description,
        image: null,
      };
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));

      form.reset();
      loadProducts();
    }
  });
  const products = JSON.parse(localStorage.getItem("products")) || [];
  function loadProducts() {
    productList.innerHTML = "";

    if (products.length === 0) {
      productList.innerHTML = "<p>No products added yet.</p>";
      return;
    }

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.style.border = "1px solid #ccc";
      productCard.style.padding = "10px";
      productCard.style.borderRadius = "5px";

      productCard.innerHTML = `
          <h3>${product.name}</h3>
          ${
            product.image
              ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 200px; object-fit: cover-contain;" />`
              : ""
          }
          <p><strong>Price:</strong> ${product.price}</p>
          
          <p>${product.description}</p>
          <p><strong>email:</strong>${product.eMail}</p>
          <p><strong>Contact:</strong>${product.contact}</p>

        `;

      productList.appendChild(productCard);
    });
  }

  // delete a product

  function getProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    return products;
  }

  function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  function deleteProduct(index) {
    const products = getProducts();
    products.splice(index, 1);
    saveProducts(products);
    renderProductList(); // Refresh product list
  }

  function renderProductList() {
    const productListDiv = document.getElementById("productList");
    const products = getProducts();
    productListDiv.innerHTML = "";

    products.forEach((product, index) => {
      const productItem = document.createElement("div");
      productItem.className = "product-item";

      productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: ₦${product.price}</p>
        <button onclick="deleteProduct(${index})">Delete</button>
      `;

      productListDiv.appendChild(productItem);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderProductList();
  });
});
