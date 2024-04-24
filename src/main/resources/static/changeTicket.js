$(function(){
    const id = window.location.search.substring(1); 
    const url = "/getOneTicket?" + id; // Set up URL to fetch a ticket based on id
    $.get(url, function(ticket){ // Send GET request to the server to fetch ticket data
        $("#id").val(ticket.id);
        $("#choose").val(ticket.movie);
        $("#total").val(ticket.total);
        $("#firstname").val(ticket.firstname);
        $("#lastname").val(ticket.lastname);
        $("#telefonnr").val(ticket.telefonnr);
        $("#email").val(ticket.email);
    });
});

function changeTicket(){
    console.log("Change ticket button clicked"); // Check if the change ticket button function is working

    const movie = $("#choose").val();
    const total = $("#total").val();
    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const telefonnr = $("#telefonnr").val();
    const email = $("#email").val();

    
    // Prevents the ticket from being changed if at least one of the input fields contains an invalid value
    if(!changeValidationMovie(movie) | !changeValidationTotal(total) | !changeValidationFirstname(firstname) | !changeValidationLastname(lastname) | !changeValidationTelefonnr(telefonnr) | !changeValidationEmail(email)){
        return;
    }

    const ticket = {
        id : $("#id").val(),
        movie : movie,
        total : total,
        firstname : firstname,
        lastname : lastname,
        telefonnr : telefonnr,
        email : email
    }
    $.post("/changeOneTicket", ticket, function (){
        window.location.href = 'index.html';
    });
}

// Function to validate selected movie for change
function changeValidationMovie(movie){
    if(!movie){
        $("#changevalidationmovie").text("Must choose a movie"); // Show error message if no movie is selected
        return false;
    } else {
        $("#changevalidationmovie").text(""); // If a movie is selected, remove any previous error messages
    }
    return true;
}

// Function to validate changing total tickets
function changeValidationTotal(total){
    if(!total){
        $("#changevalidationtotal").text("Must enter a value for total tickets"); // Show message to enter a value if no value is entered
        return false;
    }
    else if(isNaN(total)){
        $("#changevalidationtotal").text("Invalid value - Please enter total tickets"); // Show error message if a value other than a number is entered
        return false;
    }
    else if(!/^[1-9][0-9]?$|^99$/.test(total)){
        $("#changevalidationtotal").text("Please select total tickets between 1 and 99"); // Show error message if a value less than 1 or greater than 99 is entered
        return false;
    } else {
        $("#changevalidationtotal").text(""); // Remove any previous error messages if entered value is valid
    }
    return true;
}

// Function to validate changing firstname
function changeValidationFirstname(firstname){
    if(!firstname){
        $("#changevalidationfirstname").text("Must enter a value for firstname"); // Show message to enter firstname if no value is entered
        return false;
    }
    else if(/[^a-zA-Z]/.test(firstname)){ // Check if firstname contains any characters other than a-z and A-Z
        $("#changevalidationfirstname").text("Invalid value - Please enter firstname"); // Show error message if firstname contains other characters even if they are letters
        return false;
    } else {
        $("#changevalidationfirstname").text("") // Remove any previous error messages if entered value is valid
    }
    return true;
}

// Function to validate changing lastname
function changeValidationLastname(lastname){
    if(!lastname){
        $("#changevalidationlastname").text("Must enter a value for lastname"); // Show message to enter lastname if no value is entered
        return false;
    }
    else if(/[^a-zA-Z]/.test(lastname)){ // Check if lastname contains any characters other than a-z and A-Z
        $("#changevalidationlastname").text("Invalid value - Please enter lastname"); // Show error message if lastname contains other characters even if they are letters
        return false;
    } else {
        $("#changevalidationlastname").text(""); // Remove any previous error messages if entered value is valid
    }
    return true;
}

// Function to validate changing phone number
function changeValidationTelefonnr(telefonnr){
    if(!telefonnr){
        $("#changevalidationtelefonnr").text("Must enter a value for phone number"); // Show message to enter phone number if no value is entered
        return false;
    }
    else if(!/^\d{8}$/.test(telefonnr)) { // Show error message if phone number contains characters other than numbers and if the number does not consist of 8 digits
        $("#changevalidationtelefonnr").text("Invalid value - Phone number must consist of 8 digits");
        return false;
    } else {
        $("#changevalidationtelefonnr").text(""); // Remove any previous error messages if entered value is valid
    }
    return true;
}

// Function to validate changing email
function changeValidationEmail(email){
    if(!email){
        $("#changevalidationemail").text("Must enter a value for email"); // Show message to enter email if no value is entered
        return false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ // Use this pattern to check if email address is valid by following the format where username comes first, then @, domain name, and top level domain
        $("#changevalidationemail").text("Invalid value - Please enter email"); // Show error message if email address is not valid
        return false;
    } else {
        $("#changevalidationemail").text(""); // Remove any previous error messages if entered value is valid
    }
    return true;
}
