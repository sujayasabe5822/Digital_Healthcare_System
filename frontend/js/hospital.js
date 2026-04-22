// hospital data
const hospitals = [

    { name: "Aditya Birla Memorial Hospital", city: "Pune", photo: "assets/images/hospital.jpg" },
    { name: "Ruby Hall Clinic", city: "Pune", photo: "assets/images/hospital.jpg" },
    { name: "Jehangir Hospital", city: "Pune", photo: "assets/images/hospital.jpg" },
    { name: "Sahyadri Hospital", city: "Pune", photo: "assets/images/hospital.jpg" },
    { name: "Deenanath Mangeshkar Hospital", city: "Pune", photo: "assets/images/hospital.jpg" },

    { name: "Kokilaben Dhirubhai Ambani Hospital", city: "Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Lilavati Hospital", city: "Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Nanavati Hospital", city: "Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Hinduja Hospital", city: "Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Wockhardt Hospital", city: "Mumbai", photo: "assets/images/hospital.jpg" },

    { name: "Seven Hills Hospital", city: "Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Jupiter Hospital", city: "Thane", photo: "assets/images/hospital.jpg" },
    { name: "Bethany Hospital", city: "Thane", photo: "assets/images/hospital.jpg" },
    { name: "Currae Hospital", city: "Thane", photo: "assets/images/hospital.jpg" },
    { name: "Hiranandani Hospital", city: "Thane", photo: "assets/images/hospital.jpg" },

    { name: "Orange City Hospital", city: "Nagpur", photo: "assets/images/hospital.jpg" },
    { name: "Wockhardt Hospital", city: "Nagpur", photo: "assets/images/hospital.jpg" },
    { name: "Kingsway Hospital", city: "Nagpur", photo: "assets/images/hospital.jpg" },
    { name: "Care Hospital", city: "Nagpur", photo: "assets/images/hospital.jpg" },
    { name: "Hope Hospital", city: "Nagpur", photo: "assets/images/hospital.jpg" },

    { name: "Sanjivani Hospital", city: "Ahmednagar", photo: "assets/images/hospital.jpg" },
    { name: "Dr Hedgewar Hospital", city: "Aurangabad", photo: "assets/images/hospital.jpg" },
    { name: "Kamalnayan Bajaj Hospital", city: "Aurangabad", photo: "assets/images/hospital.jpg" },
    { name: "United CIIGMA Hospital", city: "Aurangabad", photo: "assets/images/hospital.jpg" },
    { name: "Sigma Hospital", city: "Aurangabad", photo: "assets/images/hospital.jpg" },

    { name: "Civil Hospital", city: "Nashik", photo: "assets/images/hospital.jpg" },
    { name: "Wockhardt Hospital", city: "Nashik", photo: "assets/images/hospital.jpg" },
    { name: "Six Sigma Hospital", city: "Nashik", photo: "assets/images/hospital.jpg" },
    { name: "Suyash Hospital", city: "Nashik", photo: "assets/images/hospital.jpg" },
    { name: "Ashoka Medicover Hospital", city: "Nashik", photo: "assets/images/hospital.jpg" },

    { name: "Aster Aadhar Hospital", city: "Kolhapur", photo: "assets/images/hospital.jpg" },
    { name: "Galaxy Hospital", city: "Kolhapur", photo: "assets/images/hospital.jpg" },
    { name: "Apple Saraswati Hospital", city: "Kolhapur", photo: "assets/images/hospital.jpg" },
    { name: "CPR Hospital", city: "Kolhapur", photo: "assets/images/hospital.jpg" },
    { name: "Lotus Hospital", city: "Kolhapur", photo: "assets/images/hospital.jpg" },

    { name: "Krishna Hospital", city: "Karad", photo: "assets/images/hospital.jpg" },
    { name: "Sanjeevani Hospital", city: "Satara", photo: "assets/images/hospital.jpg" },
    { name: "Yashoda Hospital", city: "Solapur", photo: "assets/images/hospital.jpg" },
    { name: "Ashwini Hospital", city: "Solapur", photo: "assets/images/hospital.jpg" },
    { name: "Civil Hospital", city: "Solapur", photo: "assets/images/hospital.jpg" },

    { name: "Shatabdi Hospital", city: "Navi Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Apollo Hospital", city: "Navi Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Terna Hospital", city: "Navi Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "MGM Hospital", city: "Navi Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Fortis Hospital", city: "Mulund", photo: "assets/images/hospital.jpg" },

    { name: "Global Hospital", city: "Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Saifee Hospital", city: "Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Holy Spirit Hospital", city: "Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "Medicover Hospital", city: "Navi Mumbai", photo: "assets/images/hospital.jpg" },
    { name: "D Y Patil Hospital", city: "Pimpri", photo: "assets/images/hospital.jpg" }

];

// save hospitals in localStorage
localStorage.setItem("hospitals", JSON.stringify(hospitals));

function loadHospitals() {

    let hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];

    displayHospitals(hospitals);

}

function displayHospitals(hospitals) {

    let container = document.getElementById("hospitalContainer");

    container.innerHTML = "";

    hospitals.forEach(hospital => {

        container.innerHTML += `

<div class="hospital-card">

<img src="${hospital.photo}" class="hospital-img">

<h3>${hospital.name}</h3>

<p>${hospital.city}</p>

<button onclick="viewHospital('${hospital.name}')">
  View Hospital
</button>


</div>

`;

    });

}


function viewHospital(hospitalName) {
    localStorage.setItem("selectedHospital", hospitalName);
    window.location.href = "viewHospital.html";
}

function searchHospital() {

    let keyword = document.getElementById("hospitalSearch").value.toLowerCase();

    let hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];

    let filtered = hospitals.filter(hospital =>

        hospital.name.toLowerCase().includes(keyword) ||
        hospital.city.toLowerCase().includes(keyword)

    );

    displayHospitals(filtered);

}

loadHospitals();