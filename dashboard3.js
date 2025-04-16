document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("productList");

  // Get the signed-in user's email from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Please sign in first.");
    window.location.href = "signin.html";
    return;
  }

  // Load the signed-in user's products
  loadProducts();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;
    const contact = document.querySelector(".contact").value;
    const imageInput = document.getElementById("productImage");
    const imageFile = imageInput.files[0];

    if (!name || !price || !description || !contact) {
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
        contact,
        eMail: currentUser.email, // tie product to signed-in user
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
        contact,
        eMail: currentUser.email,
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

  function loadProducts() {
    productList.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const userProducts = products.filter(
      (product) => product.eMail === currentUser.email
    );

    if (userProducts.length === 0) {
      productList.innerHTML = "<p>You haven't added any products yet.</p>";
      return;
    }

    userProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.style.border = "1px solid #ccc";
      productCard.style.padding = "10px";
      productCard.style.borderRadius = "5px";

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

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        const updatedProducts = products.filter((product) => product.id !== id);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        loadProducts();
      });
    });
  }
});
