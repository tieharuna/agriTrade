document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("productList");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;
    const eMail = document.getElementById("mail").value;
    const contact = document.querySelector(".contact").value;
    const productLocation = document.getElementById("loca").value;
    const imageInput = document.getElementById("productImage");
    const imageFile = imageInput.files[0];

    if (!name || !price || !description || !eMail || !contact || !location) {
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
        productLocation,
        image: imageURL,
      };

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
      const newProduct = {
        id: Date.now(),
        name,
        price,
        description,
        eMail,
        contact,
        productLocation,
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

  // Load products from localStorage and render them
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || []; // moved inside!
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
      productCard.style.marginBottom = "10px";

      productCard.innerHTML = `
        <h3>${product.name}</h3>
        ${
          product.image
            ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 200px; object-fit: cover;" />`
            : ""
        }
        <p><strong>Price:</strong> ${product.price}</p>
        <p>${product.description}</p>
        <p><strong>Email:</strong> ${product.eMail}</p>
        <p><strong>Contact:</strong> ${product.contact}</p>
        <p><strong>Loaction: </strong>${product.productLocation}</p>
        <button class="delete-btn" data-id="${product.id}">Delete</button>
      `;

      productList.appendChild(productCard);
    });

    // Setup delete button event listeners
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-id");
        deleteProduct(productId);
      });
    });
  }

  /*
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
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
      productCard.style.marginBottom = "10px";

      productCard.innerHTML = `
          <h3>${product.name}</h3>
          ${
            product.image
              ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 200px; object-fit: cover;" />`
              : ""
          }
          <p><strong>Price:</strong> ${product.price}</p>
          <p>${product.description}</p>
          <p><strong>Email:</strong> ${product.eMail}</p>
          <p><strong>Contact:</strong> ${product.contact}</p>
          <button class="delete-btn" data-id="${product.id}">Delete</button>
        `;

      productList.appendChild(productCard);
    });

    // Set up delete button listeners
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-id");
        deleteProduct(productId);
      });
    });
  }
*/
  // Delete product by ID
  function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter((product) => product.id != id);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts(); // Refresh the product list
  }

  // Initial load
  loadProducts();
});
