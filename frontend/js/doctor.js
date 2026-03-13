function loadDoctorAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let html = "";

   appointments
    .filter(a => a.doctor === currentUser.name)
    .forEach((a, index) => {
        html += `
        <div class="appointment-row">
            <div class="appointment-info">
                Patient: ${a.patient} | Booked at ${a.date} ${a.time}
            </div>
            <button class="approve-btn" onclick="approve(${index})">
                Approve
            </button>
        </div>
        `;
    });

    document.getElementById("doctorAppointments").innerHTML = html;
}

function approve(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments"));
    appointments[index].status = "Approved";
    localStorage.setItem("appointments", JSON.stringify(appointments));
    loadDoctorAppointments();
}

loadDoctorAppointments();