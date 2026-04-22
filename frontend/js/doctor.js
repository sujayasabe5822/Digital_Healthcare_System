function loadDoctorAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let html = "";

    appointments.forEach((a, index) => {

        if (a.doctor === currentUser.name) {

            html += `
            <div class="appointment-row">
                <div class="appointment-info">
                    Patient: ${a.patient} | Booked at ${a.date} ${a.time}
                </div>

                ${
                    a.status === "Approved"
                        ? `<span class="approved-text">Approved ✅</span>`
                        : `<button class="approve-btn" onclick="approve(${index})">Approve</button>`
                }
            </div>
            `;
        }
    });

    document.getElementById("doctorAppointments").innerHTML = html;
}

function approve(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    if (!appointments[index]) return; // safety

    appointments[index].status = "Approved";

    localStorage.setItem("appointments", JSON.stringify(appointments));

    loadDoctorAppointments();
}


loadDoctorAppointments();