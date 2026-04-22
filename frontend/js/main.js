fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
        updateNavbar();
    });

function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const authSection = document.getElementById("authSection");

    if (!authSection) return;

    const currentPath = window.location.pathname;
    const isDashboardPage = currentPath.includes("dashboard");

    if (currentUser) {

        let dashboardLink = "index.html";

        if (currentUser.role === "patient") {
            dashboardLink = "patient-dashboard.html";
        } else if (currentUser.role === "doctor") {
            dashboardLink = "doctor-dashboard.html";
        } else if (currentUser.role === "admin") {
            dashboardLink = "admin-dashboard.html";
        }

        if (isDashboardPage) {
            authSection.innerHTML = `
                <a href="#" id="logoutBtn">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </a>
            `;
        } else {
            authSection.innerHTML = `
                <a href="${dashboardLink}">
                    <i class="fa-solid fa-user-check"></i>
                </a>
            `;
        }

    } else {
        authSection.innerHTML = `
            <a href="loginRegister.html">
                <i class="fa-solid fa-circle-user"></i>
            </a>
        `;
    }
}


// 🔥 ADD THIS AT VERY BOTTOM (IMPORTANT)
document.addEventListener("click", function (e) {
    if (e.target.closest("#logoutBtn")) {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "loginRegister.html";
    }
});