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
}

function displayAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let html = "";
    appointments
        .filter(a => a.patient === currentUser.name)
        .forEach(a => {
            html += `<p>Doctor: ${a.doctor} | ${a.date} ${a.time} | ${a.status}</p>`;
        });

    document.getElementById("appointments").innerHTML = html;
}

displayAppointments();