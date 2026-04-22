document.addEventListener("DOMContentLoaded", function () {

    const selectedHospital = localStorage.getItem("selectedHospital");
    console.log("Selected:", selectedHospital);

    if (!selectedHospital) {
        document.getElementById("hospitalInfo").innerHTML =
            "<h2>No hospital selected</h2>";
        return;
    }

    console.log("Hospitals Data:", hospitalsData);
    console.log("Doctors Data:", doctorsData);

    // Find hospital
    const hospital = hospitalsData.find(h => h.name === selectedHospital);

    if (!hospital) {
        document.getElementById("hospitalInfo").innerHTML =
            "<h2>Hospital not found</h2>";
        return;
    }

    // Display hospital
    document.getElementById("hospitalInfo").innerHTML = `
        <div class="hospital-card">
            <img src="${hospital.photo}">
            <h2>${hospital.name}</h2>
            <p>${hospital.city}</p>
        </div>
    `;

    // Facilities
    const facilityDiv = document.getElementById("facilities");
    facilityDiv.innerHTML = "";

    if (hospital.facilities) {
        hospital.facilities.forEach(f => {
            facilityDiv.innerHTML += `<span class="facility">${f}</span>`;
        });
    }

    // Filter doctors
    const hospitalDoctors = doctorsData.filter(
        doc => doc.hospital === selectedHospital
    );

    console.log("Filtered Doctors:", hospitalDoctors);

    // Display doctors
    const doctorList = document.getElementById("doctorList");
    doctorList.innerHTML = "";

    if (hospitalDoctors.length === 0) {
        doctorList.innerHTML = "<p>No doctors available</p>";
    } else {
        hospitalDoctors.forEach(doc => {
        doctorList.innerHTML += `
    <div class="doctor-card">
        <img src="${doc.image}" alt="">
        
        <h3>${doc.name}</h3>
        <p class="spec">${doc.speciality}</p>
        <p class="hospital">${doc.hospital}</p>

        <div class="details">
            <span>⭐ ${doc.rating}</span>
            <span>💼 ${doc.experience}</span>
        </div>

        <div class="details">
            <span>Fee: ₹${doc.fee}</span>
            <span class="${doc.availability === "Available" ? "available" : "busy"}">
                ${doc.availability}
            </span>
        </div>

        <button onclick='bookDoctor(${JSON.stringify(doc)})'
            ${doc.availability === "Busy" ? "disabled" : ""}>
            Book Appointment
        </button>
    </div>
`;
        });
    }

});

