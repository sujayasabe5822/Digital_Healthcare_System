function register() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const user = { name, email, password, role };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // If Doctor
    if (role === "doctor") {
        const newDoctor = {
            name: name,
            username: email,
            password: password,
            speciality: "General",
            hospital: "Not Assigned",
            experience: "0 years",
            rating: 0,
            fee: 0,
            availability: "Available",
            image: "assets/images/DoctorMale.jpg"
        };

        doctors.push(newDoctor);
        localStorage.setItem("doctors", JSON.stringify(doctors));
    }

    
    if (role === "patient") {
        const newPatient = {
            name: name,
            username: email,
            password: password,
            age: 0,
            gender: "Not Specified"
        };

        patients.push(newPatient);
        localStorage.setItem("patients", JSON.stringify(patients));
    }

    alert("Registration Successful!");
    window.location.href = "loginRegister.html";
}

function login() {

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    //  Include default JSON data
    const allDoctors = [
        ...(typeof doctorsData !== "undefined" ? doctorsData : []),
        ...doctors
    ];

    const allPatients = [
        ...(typeof patientsData !== "undefined" ? patientsData : []),
        ...patients
    ];

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    //  Check Doctor
    let doctor = allDoctors.find(d => d.username === email && d.password === password);

    if (doctor) {
        localStorage.setItem("currentUser", JSON.stringify({
            ...doctor,
            role: "doctor"   // ✅ FIX ADDED
        }));
        window.location.href = "doctor-dashboard.html";
        return;
    }

    //  Check Patient
    let patient = allPatients.find(p => p.username === email && p.password === password);

    if (patient) {
        localStorage.setItem("currentUser", JSON.stringify({
            ...patient,
            role: "patient"  // ✅ FIX ADDED
        }));
        window.location.href = "patient-dashboard.html";
        return;
    }

    // Check Admin/User
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify({
            ...user,
            role: user.role || "admin"   // ✅ safety
        }));

        if (user.role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else {
            // fallback (if needed)
            window.location.href = "index.html";
        }
        return;
    }

    // ❌ Invalid
    alert("Invalid Credentials!");
}