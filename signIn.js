document.getElementById("signinForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (matchedUser) {
    // Store current user info (basic session)
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    alert("Sign in successful!");
    window.location.href = "dashboard.html"; // redirect to dashboard or wherever
  } else {
    alert("Invalid email or password.");
  }
});
