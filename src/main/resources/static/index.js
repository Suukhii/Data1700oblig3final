// Function to validate movie selection
function checkValidationMovie(movie){
    if(!movie){
        $("#validatemovie").text("Choose a movie"); // Display error message if no movie is selected
        return false;
    } else {
        $("#validatemovie").text(""); // Clear previous error messages if a movie is selected
    }
    return true;
}

// Function to validate total ticket input
function checkValidationTotal(total){
    if(!total){
        $("#validatetotal").text("Enter total tickets"); // Display message to enter total tickets if no input is provided
        return false;
    }
    else if(isNaN(total)){
        $("#validatetotal").text("Invalid value - Please enter a number"); // Display error message if input is not a number
        return false;
    }
    else if(!/^[1-9][0-9]?$|^99$/.test(total)){
        $("#validatetotal").text("Please select tickets between 1 and 99"); // Display error message if input is not between 1 and 99
        return false;
    } else {
        $("#validatetotal").text(""); // Clear previous error messages if input is valid
    }
    return true;
}

// Function to validate firstname input
function checkValidationFirstname(firstname){
    if(!firstname){
        $("#validatefirstname").text("Enter your firstname"); // Display message to enter firstname if no input is provided
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(firstname)){ // Test if firstname contains characters other than letters
        $("#validatefirstname").text("Invalid value - Please enter your firstname"); // Display error message if firstname contains invalid characters
        return false;
    } else {
        $("#validatefirstname").text(""); // Clear previous error messages if input is valid
    }
    return true;
}

// Function to validate lastname input
function checkValidationLastname(lastname){
    if(!lastname){
        $("#validatelastname").text("Enter your lastname"); // Display message to enter lastname if no input is provided
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(lastname)){ // Test if lastname contains characters other than letters
        $("#validatelastname").text("Invalid value - Please enter your lastname"); // Display error message if lastname contains invalid characters
        return false;
    } else {
        $("#validatelastname").text(""); // Clear previous error messages if input is valid
    }
    return true;
}

// Function to validate phone number input
function checkValidationTelefonnr(telefonnr){
    if(!telefonnr){
        $("#validatetelefonnr").text("Enter your phone number"); // Display message to enter phone number if no input is provided
        return false;
    }
    else if(!/^\d{8}$/.test(telefonnr)) { // Test if phone number contains exactly 8 digits
        $("#validatetelefonnr").text("Invalid value - Phone number must be 8 digits"); // Display error message if phone number is invalid
        return false;
    } else {
        $("#validatetelefonnr").text(""); // Clear previous error messages if input is valid
    }
    return true;
}

// Function to validate email input
function checkValidationEmail(email){
    if(!email){
        $("#validateemail").text("Enter your email"); // Display message to enter email if no input is provided
        return false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ // Test if email follows the standard format
        $("#validateemail").text("Invalid value - Please enter a valid email"); // Display error message if email is invalid
        return false;
    } else {
        $("#validateemail").text(""); // Clear previous error messages if input is valid
    }
    return true;
}

// Function to display ticket registration form
function TicketRegistration(){
    // Retrieve input values
    const movie = $("#choose").val();
    const total = $("#total").val();
    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const telefonnr = $("#telefonnr").val();
    const email = $("#email").val();

    // Validate input values
    if(!checkValidationMovie(movie) | !checkValidationTotal(total) | !checkValidationFirstname(firstname) | !checkValidationLastname(lastname) | !checkValidationTelefonnr(telefonnr) | !checkValidationEmail(email)){
        return;
    }

    // Create new ticket object
    const newTicket = {
        movie : movie,
        total : total,
        firstname : firstname,
        lastname : lastname,
        telefonnr : telefonnr,
        email : email
    };

    // Send post request to save ticket
    $.post("/save", newTicket, function (){
        getAll();
    });

    // Clear form after submission
    clearForm();
}

// Function to clear input form
function clearForm(){
    $("#choose").val("");
    $("#total").val("");
    $("#firstname").val("");
    $("#lastname").val("");
    $("#telefonnr").val("");
    $("#email").val("");
}

// Function to get all tickets and display them
function getAll(){
    $.get("/getAll", function (data){
        showTicketTabell(data);
    });
}

// Function to display all tickets in a table
function showTicketTabell(tickets){
    let out = "<table class='table table-striped' style='text-align: center'><tr>" +
        "<th><strong>Movie</strong></th>" +
        "<th><strong>Total</strong></th>" +
        "<th><strong>Firstname</strong></th>" +
        "<th><strong>Lastname</strong></th>" +
        "<th><strong>Telefonnr</strong></th>" +
        "<th><strong>Email</strong></th>" +
        "<th></th>" +
        "<th></th>" +
        "</tr>";

    for(const newTicket of tickets){
        out+="<tr>";
        out+="<td>"+newTicket.movie+"</td>" +
            "<td>"+newTicket.total+"</td>" +
            "<td>"+newTicket.firstname+"</td>" +
            "<td>"+newTicket.lastname+"</td>" +
            "<td>"+newTicket.telefonnr+"</td>" +
            "<td>"+newTicket.email+"</td>" +
            "<td><a class='btn btn-primary' href='changeTicket.html?id="+newTicket.id+"'>Change</a></td>" +
            "<td><button type='button' class='btn btn-danger' onclick='deleteOneTicket("+newTicket.id+")'>Delete</button></td>";
        out+="</tr>";
    }
    out+="</table>";

    $("#ticketregistration").html(out);
}

// Function to initialize ticket display on page load
$(function() {
    $.get("/getAll", function (data) {
        if (data.length > 0) {
            showTicketTabell(data);
        }
    });
});

// Function to delete a single ticket
function deleteOneTicket(id){
    const url = "/deleteOneTicket?id="+id;
    $.get(url, function (){
        getAll();
    });
}

// Function to delete all tickets
function deleteAllTickets(){
    $.get("/deleteAll", function (){
        showTicketTabell([]);
        console.log("Table cleared");
    });
}
