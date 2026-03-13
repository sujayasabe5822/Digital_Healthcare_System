function register() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    window.location.href = "loginRegister.html";
}

function login() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        if (user.role === "patient") {
            window.location.href = "patient-dashboard.html";
        } else if (user.role === "doctor") {
            window.location.href = "doctor-dashboard.html";
        } else {
            window.location.href = "admin-dashboard.html";
        }
    } else {
        alert("Invalid Credentials!");
    }
}