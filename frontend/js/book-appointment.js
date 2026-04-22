const selectedDoctorName = localStorage.getItem("selectedDoctor");



const selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const doctorName = document.getElementById("doctorName");
const speciality = document.getElementById("speciality");
const hospital = document.getElementById("hospital");
const fee = document.getElementById("fee");


const patientName = document.getElementById("patientName");

// Auto-fill
if (selectedDoctor) {
    doctorName.value = selectedDoctor.name;
    speciality.value = selectedDoctor.speciality;
    hospital.value = selectedDoctor.hospital;
    fee.value = selectedDoctor.fee;

    patientName.value = currentUser.name;
    // Lock fields
    doctorName.readOnly = true;
    speciality.readOnly = true;
    hospital.readOnly = true;
    fee.readOnly = true;
}

// Submit form
// document.getElementById("appointmentForm").addEventListener("submit", function(e) {
//     e.preventDefault();




// Check if doctor exists in system
const form = document.getElementById("appointmentForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const doctorNameValue = document.getElementById("doctorName").value.trim();

        const doctorExists = doctorsData.some(doc =>
            doc.name.toLowerCase() === doctorNameValue.toLowerCase()
        );

        if (!doctorExists) {
            alert("Doctor Not Registered In Digital Healthcare System");
            return;
        }

        // ✅ CREATE APPOINTMENT HERE (inside event)
        const appointment = {
            doctor: doctorNameValue,
            speciality: document.getElementById("speciality").value,
            hospital: document.getElementById("hospital").value,
            fee: document.getElementById("fee").value,

            patient: document.getElementById("patientName").value,
            age: document.getElementById("age").value,
            address: document.getElementById("address").value,
            mobile: document.getElementById("mobile").value,
            email: document.getElementById("email").value,

            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            status: "Pending"
        };

        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);

        localStorage.setItem("appointments", JSON.stringify(appointments));

        alert("Appointment Booked Successfully!");

        localStorage.removeItem("selectedDoctor");
        form.reset();
    });
}

let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
appointments.push(appointments);

localStorage.setItem("appointments", JSON.stringify(appointments));

alert("Appointment Booked Successfully!");

localStorage.removeItem("selectedDoctor");
document.getElementById("appointmentForm").reset();


function clearDoctor() {
    localStorage.removeItem("selectedDoctor");
}

function clearForm() {
    // Clear form
    document.getElementById("appointmentForm").reset();

    // Remove selected doctor (if any)
    localStorage.removeItem("selectedDoctor");

    // Enable doctor fields again
    document.getElementById("doctorName").readOnly = false;
    document.getElementById("speciality").readOnly = false;
    document.getElementById("hospital").readOnly = false;
    document.getElementById("fee").readOnly = false;
}

function loadBooking() {
    fetch("./book-appointment.html")
        .then(res => res.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");

            document.getElementById("bookingContainer").innerHTML = doc.body.innerHTML;

            // 🔥 NOW form exists → attach event
            attachFormEvent();
        })
        .catch(err => console.error("Error loading booking page:", err));
}

function attachFormEvent() {
    const form = document.getElementById("appointmentForm");

    if (!form) {
        console.log("Form not found yet");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const doctorNameValue = document.getElementById("doctorName").value.trim();

        const doctorExists = doctors.some(doc =>
            doc.name.toLowerCase() === doctorNameValue.toLowerCase()
        );

        if (!doctorExists) {
            alert("Doctor Not Registered In Digital Healthcare System");
            return;
        }

        const appointment = {
            doctor: doctorNameValue,
            patient: document.getElementById("patientName").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            status: "Pending"
        };

        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);

        localStorage.setItem("appointments", JSON.stringify(appointments));

        alert("Appointment Booked Successfully!");
        form.reset();
    });
}

function bookAppointment() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const appointment = {
        patient: currentUser.name,
        doctor: document.getElementById("doctorName").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        status: "Pending"
    };

    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment Booked!");
    displayAppointments();

    clearForm();

}

function displayAppointments() {
    let container = document.getElementById("appointments");

    // 🔥 FIX: check first
    if (!container) return;

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let html = "";

    appointments
        .filter(a => a.patient === currentUser.name)
        .forEach(a => {
            html += `<p>Doctor: ${a.doctor} | ${a.date} ${a.time} | ${a.status}</p>`;
        });

    container.innerHTML = html;
}

if (document.getElementById("appointments")) {
    displayAppointments();
}