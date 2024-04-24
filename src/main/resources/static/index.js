
//Funksjon for å validere valgt film
function checkValidationMovie(movie){
    if(!movie){
        $("#validatemovie").text("Må velge en film"); //Viser feilmelding hvis det ikke ble valgt en film (dette er ikke nødvendig å ha med i forhold til oppgaven, men kan være greit å gjøre brukeren obs på at det ikke ble valgt en film)
        return false;
    } else {
        $("#validatemovie").text(""); //Hvis det ble valgt en film, vil evt. tidligere feilmeldinger fjernes
    }
    return true;
}

//Funksjon for validering av antall billetter
function checkValidationTotal(total){
    if(!total){
        $("#validatetotal").text("Må skrive inn noe i antall"); //Viser beskjed om å skrive inn tall hvis det ikke ble skrevet inn noe tall
        return false;
    }
    else if(isNaN(total)){
        $("#validatetotal").text("Ugyldig verdi - Vennligst skriv inn antall billetter"); //Viser feilmesling hvis det ble skrevet inn noe annet enn tall
        return false;
    }
    else if(!/^[1-9][0-9]?$|^99$/.test(total)){
        $("#validatetotal").text("Vennligst velg antall billetter mellom 1 og 99"); //Viser feilmelding hvis det ble skrevet inn et antall mindre enn 1 eller større enn 99
        return false;
    } else {
        $("#validatetotal").text(""); //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av fornavn
function checkValidationFirstname(firstname){
    if(!firstname){
        $("#validatefirstname").text("Må skrive inn noe inn i fornavnet"); //Gir beskjed om å skrive inn fornavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(firstname)){ //Tester om fornavn inneholder noe annet enn bokstavene a-z og A-Z
        $("#validatefirstname").text("Ugyldig verdi - Vennligst skriv inn fornavn"); //Viser feilmelding hvis fornavn inneholder andre symboler, selv om det er bokstaver i fornavnet
        return false;
    } else {
        $("#validatefirstname").text("") //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av etternavn
function checkValidationLastname(lastname){
    if(!lastname){
        $("#validatelastname").text("Må skrive inn noe inn i etternavnet"); //Gir beskjed om å skrive inn etternavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(lastname)){ //Tester om fornavn inneholder noe annet enn bokstavene a-z og A-Z
        $("#validatelastname").text("Ugyldig verdi - Vennligst skriv inn etternavn"); //Viser feilmelding hvis etternavn inneholder andre symboler, selv om det er bokstaver i etternavnet
        return false;
    } else {
        $("#validatelastname").text(""); //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av telefonnummer
function checkValidationTelefonnr(telefonnr){
    if(!telefonnr){
        $("#validatetelefonnr").text("Må skrive inn noe inn i telefonnr");
        return false;
    }
    else if(!/^\d{8}$/.test(telefonnr)) { //Viser feilmelding hvis telefonnummer inneholder andre symboler enn tall og om nummeret ikke består av 8 siffere
        $("#validatetelefonnr").text("Ugyldig verdi - Telefonnummer må bestå av 8 siffer");
        return false;
    } else {
        $("#validatetelefonnr").text("");
    }
    return true;
}

//Funksjon for validering av epostadresse
function checkValidationEmail(email){
    if(!email){
        $("#validateemail").text("Må skrive inn noe inn i epost");
        return false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ //Bruker dette mønsteret til å sjekke om epostadresse er gyldid ved å følge formatet der brukernavn er først, så @, domenenavn og toppnivådomene
        $("#validateemail").text("Ugyldig verdi - Vennligst skriv inn epost"); //Viser feilmelding hvsi epostadresse ikke er gyldig
        return false;
    } else {
        $("#validateemail").text("");
    }
    return true;
}


//funksjon for å vise billettregister
function TicketRegistration(){

    const movie = $("#choose").val();
    const total = $("#total").val();
    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const telefonnr = $("#telefonnr").val();
    const email = $("#email").val();



    if(!checkValidationMovie(movie) | !checkValidationTotal(total) | !checkValidationFirstname(firstname) | !checkValidationLastname(lastname) | !checkValidationTelefonnr(telefonnr) | !checkValidationEmail(email)){
        return;
    }

    const newTicket = {
        movie : movie,
        total : total,
        firstname : firstname,
        lastname : lastname,
        telefonnr : telefonnr,
        email : email
    };

    $.post("/save", newTicket, function (){
        getAll();
    });

    clearForm();
}


function clearForm(){
    $("#choose").val("");
    $("#total").val("");
    $("#firstname").val("");
    $("#lastname").val("");
    $("#telefonnr").val("");
    $("#email").val("");
}

function getAll(){
    $.get("/getAll", function (data){
        showTicketTabell(data);
    });
}


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
            "<td><a class='btn btn-primary' href='changeTicket.html?id="+newTicket.id+"'>Endre</a></td>" +
            "<td><button type='button' class='btn btn-danger' onclick='deleteOneTicket("+newTicket.id+")'>Slett</button></td>";
        out+="</tr>";
    }
    out+="</table>";

    $("#ticketregistration").html(out);
}




$(function() {
    $.get("/getAll", function (data) {
        if (data.length > 0) {
            showTicketTabell(data);
        }
    });
});


function deleteOneTicket(id){
    const url = "/deleteOneTicket?id="+id;
    $.get(url, function (){
        //window.location.href = "/";
        getAll();
    });
}

function deleteAllTickets(){
    $.get("/deleteAll", function (){
        showTicketTabell([]);
        console.log("Tabell slettet");
    });
}
