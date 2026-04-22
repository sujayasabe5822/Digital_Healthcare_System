const container = document.getElementById("doctorContainer");

// Load all doctors initially
function displayDoctors(list) {
    container.innerHTML = "";

    list.forEach(doc => {
        container.innerHTML += `
            <div class="card">
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

function bookDoctor(doc) {
    // Save full doctor data
    localStorage.setItem("selectedDoctor", JSON.stringify(doc));

    // Redirect
    window.location.href = "book-appointment.html";
}

// Search Function
function searchDoctor() {
    const value = document.getElementById("searchInput").value.toLowerCase();

    const filtered = doctorsData.filter(doc =>
        doc.name.toLowerCase().includes(value) ||
        doc.speciality.toLowerCase().includes(value)
    );

    displayDoctors(filtered);
}

// Initial Load
displayDoctors(doctorsData);