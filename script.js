// Token Number Counter
let tokenNumber = 1;


// Reservation Form
document.getElementById("reservationForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        // Get passenger details

        let name =
            document.getElementById("name").value;

        let age =
            document.getElementById("age").value;

        let mobile =
            document.getElementById("mobile").value;

        let destination =
            document.getElementById("destination").value;

        let date =
            document.getElementById("date").value;

        let time =
            document.getElementById("time").value;


        // Generate Token

        let token =
            "FLT-" + String(tokenNumber).padStart(3, "0");

        tokenNumber++;


        // Show Token in Form

        document.getElementById("token").value = token;


        // Display Confirmation

        document.getElementById("showName").innerText =
            name;

        document.getElementById("showAge").innerText =
            age;

        document.getElementById("showMobile").innerText =
            mobile;

        document.getElementById("showDestination").innerText =
            destination;

        document.getElementById("showDate").innerText =
            date;

        document.getElementById("showTime").innerText =
            time;

        document.getElementById("showToken").innerText =
            token;


        // Show confirmation box

        document.getElementById("confirmation")
            .style.display = "block";


        // Scroll to confirmation

        document.getElementById("confirmation")
            .scrollIntoView({
                behavior: "smooth"
            });

    });