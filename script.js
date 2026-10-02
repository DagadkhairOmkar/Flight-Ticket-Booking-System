// =====================================
// FLIGHT FARE
// =====================================

const flightFare = {

    "SK101": 5500,
    "SK202": 4500,
    "SK303": 4000,
    "SK404": 6000

};


const flightSelect =
    document.getElementById("flight");

const fare =
    document.getElementById("fare");


flightSelect.addEventListener("change", function () {

    const selectedFlight = this.value;

    if (selectedFlight) {

        fare.innerText =
            flightFare[selectedFlight];

    } else {

        fare.innerText = "4500";

    }

});


// =====================================
// TOKEN GENERATOR
// =====================================

function generateToken() {

    const randomNumber =
        Math.floor(100000 + Math.random() * 900000);

    return "SK-" + randomNumber;

}


// =====================================
// BOOKING FORM
// =====================================

document
    .getElementById("bookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        // Get passenger information

        const name =
            document.getElementById("passengerName").value;

        const age =
            document.getElementById("passengerAge").value;

        const mobile =
            document.getElementById("mobile").value;

        const flight =
            document.getElementById("flight").value;

        const destination =
            document.getElementById("destination").value;

        const date =
            document.getElementById("travelDate").value;

        const time =
            document.getElementById("travelTime").value;

        const seat =
            document.getElementById("seat").value;


        // Validation

        if (mobile.length !== 10) {

            alert(
                "Please enter a valid 10 digit mobile number."
            );

            return;

        }


        if (!flight) {

            alert(
                "Please select a flight."
            );

            return;

        }


        // Generate Token

        const token =
            generateToken();


        // Fare

        const ticketFare =
            flightFare[flight];


        // Display Ticket

        document.getElementById("ticketToken")
            .innerText = token;

        document.getElementById("ticketName")
            .innerText = name;

        document.getElementById("ticketAge")
            .innerText = age;

        document.getElementById("ticketMobile")
            .innerText = mobile;

        document.getElementById("ticketFlight")
            .innerText = flight;

        document.getElementById("ticketDestination")
            .innerText = destination;

        document.getElementById("ticketDate")
            .innerText = formatDate(date);

        document.getElementById("ticketTime")
            .innerText = time;

        document.getElementById("ticketSeat")
            .innerText = seat;

        document.getElementById("ticketFare")
            .innerText = ticketFare;


        // Save booking

        const booking = {

            token: token,

            name: name,

            age: age,

            mobile: mobile,

            flight: flight,

            destination: destination,

            date: date,

            time: time,

            seat: seat,

            fare: ticketFare

        };


        let bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        bookings.push(booking);


        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );


        // Show success section

        const success =
            document.getElementById("ticket");

        success.style.display = "block";


        success.scrollIntoView({
            behavior: "smooth"
        });


        // Update History

        displayBookings();


        // Success notification

        alert(
            "🎉 Ticket Booked Successfully!\n\nToken No: "
            + token
        );

});


// =====================================
// DATE FORMAT
// =====================================

function formatDate(date) {

    const d =
        new Date(date);

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// =====================================
// DISPLAY BOOKING HISTORY
// =====================================

function displayBookings(
    data = null
) {

    const history =
        document.getElementById("bookingHistory");


    const bookings =
        data ||
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];


    history.innerHTML = "";


    if (bookings.length === 0) {

        history.innerHTML =
            '<p class="empty">No booking available.</p>';

        return;

    }


    bookings.forEach(function(booking) {

        const card =
            document.createElement("div");

        card.className =
            "history-card";


        card.innerHTML = `

            <h3>
                ✈️ ${booking.flight}
            </h3>

            <p>
                <b>Token:</b>
                ${booking.token}
            </p>

            <p>
                <b>Passenger:</b>
                ${booking.name}
            </p>

            <p>
                <b>Destination:</b>
                ${booking.destination}
            </p>

            <p>
                <b>Date:</b>
                ${formatDate(booking.date)}
            </p>

            <p>
                <b>Time:</b>
                ${booking.time}
            </p>

            <p>
                <b>Seat:</b>
                ${booking.seat}
            </p>

            <p>
                <b>Fare:</b>
                ₹${booking.fare}
            </p>

        `;


        history.appendChild(card);

    });

}


// =====================================
// SEARCH BOOKING
// =====================================

function searchBooking() {

    const search =
        document
        .getElementById("searchToken")
        .value
        .trim()
        .toUpperCase();


    const bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];


    if (!search) {

        displayBookings();

        return;

    }


    const result =
        bookings.filter(function(booking) {

            return booking.token
                .toUpperCase()
                .includes(search);

        });


    displayBookings(result);

}


// =====================================
// PRINT TICKET
// =====================================

function printTicket() {

    window.print();

}


// =====================================
// NEW BOOKING
// =====================================

function newBooking() {

    document
        .getElementById("bookingForm")
        .reset();


    document
        .getElementById("ticket")
        .style.display = "none";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =====================================
// LOAD BOOKING HISTORY
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayBookings();


        // Minimum travel date = today

        const today =
            new Date()
            .toISOString()
            .split("T")[0];


        document
            .getElementById("travelDate")
            .setAttribute(
                "min",
                today
            );

    }
);