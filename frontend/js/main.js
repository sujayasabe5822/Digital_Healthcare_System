fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
      document.getElementById("navbar").innerHTML = data;
      updateNavbar();
  });

function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navLinks = document.getElementById("navLinks");

    if (currentUser) {

        // Decide dashboard based on role
        let dashboardLink = "";

        if (currentUser.role === "patient") {
            dashboardLink = "patient-dashboard.html";
        } else if (currentUser.role === "doctor") {
            dashboardLink = "doctor-dashboard.html";
        } else if (currentUser.role === "admin") {
            dashboardLink = "admin-dashboard.html";
        }

        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="${dashboardLink}">Dashboard</a>
            <a href="#" id="logoutBtn">Logout</a>
        `;

        document.getElementById("logoutBtn").addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "loginRegister.html";
        });

    } else {

        navLinks.innerHTML = `
            <a href="loginRegister.html">Login</a>
            <a href="register.html">Register</a>
        `;
    }
}