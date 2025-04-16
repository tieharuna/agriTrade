document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    alert("A user with this email already exists.");
    return;
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful! Please sign in.");
  window.location.href = "signIn.html";
});
