function loadAllAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let html = "";

    appointments.forEach(a => {
    html += `
        <div class="appointment-row">
            <div class="appointment-info">
                Patient: ${a.patient} | Doctor: ${a.doctor} <br>
                ${a.date} ${a.time}
            </div>
            <div class="status-badge ${a.status === 'Approved' ? 'approved' : 'pending'}">
                ${a.status}
            </div>
        </div>
    `;
});

    document.getElementById("allAppointments").innerHTML = html;
}

loadAllAppointments();