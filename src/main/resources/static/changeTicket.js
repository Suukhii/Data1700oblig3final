
$(function(){
    const id = window.location.search.substring(1); //Henter ID fra URL-parameteren
    const url = "/getOneTicket?"+id; //Setter opp URL-en for å hente en billett basert på id
    $.get(url,function(ticket){ //Sender GET-forespørsel til serveren for å hente billettdata fra serveren
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
    console.log("Endre billett knapp klikket"); //Sjekker om at billettknapp funksjonen fungerer

    const movie = $("#choose").val();
    const total = $("#total").val();
    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const telefonnr = $("#telefonnr").val();
    const email = $("#email").val();


    //Sjekker om alle valideringsfunksjonene returnerer 'false', som indikerer at minst en av inputverdiene ikke er gyldig
    //Hindrer at billetten blir endret dersom minst en av inputfeltene inneholder ugyldig verdi
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
    $.post("/changeOneTicket",ticket,function (){
        window.location.href = 'index.html';
    });
}

//Funksjon for å validere valgt endret film
function changeValidationMovie(movie){
    if(!movie){
        $("#changevalidationmovie").text("Må velge en film"); //Viser feilmelding hvis det ikke ble valgt en film (dette er ikke nødvendig å ha med i forhold til oppgaven, men kan være greit å gjøre brukeren obs på at det ikke ble valgt en film)
        return false;
    } else {
        $("#changevalidationmovie").text(""); //Hvis det ble valgt en film, vil evt. tidligere feilmeldinger fjernes
    }
    return true;
}

//Funksjon for validering av endring av antall billetter
function changeValidationTotal(total){
    if(!total){
        $("#changevalidationtotal").text("Må skrive inn noe i antall"); //Viser beskjed om å skrive inn tall hvis det ikke ble skrevet inn noe tall
        return false;
    }
    else if(isNaN(total)){
        $("#changevalidationtotal").text("Ugyldig verdi - Vennligst skriv inn antall billetter"); //Viser feilmesling hvis det ble skrevet inn noe annet enn tall
        return false;
    }
    else if(!/^[1-9][0-9]?$|^99$/.test(total)){
        $("#changevalidationtotal").text("Vennligst velg antall billetter mellom 1 og 99"); //Viser feilmelding hvis det ble skrevet inn et antall mindre enn 1 eller større enn 99
        return false;
    } else {
        $("#changevalidationtotal").text(""); //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av endret fornavn
function changeValidationFirstname(firstname){
    if(!firstname){
        $("#changevalidationfirstname").text("Må skrive inn noe inn i fornavnet"); //Gir beskjed om å skrive inn fornavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(firstname)){ //Tester om fornavn inneholder noe annet enn bokstavene a-z og A-Z
        $("#changevalidationfirstname").text("Ugyldig verdi - Vennligst skriv inn fornavn"); //Viser feilmelding hvis fornavn inneholder andre symboler, selv om det er bokstaver i fornavnet
        return false;
    } else {
        $("#changevalidationfirstname").text("") //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av endret etternavn
function changeValidationLastname(lastname){
    if(!lastname){
        $("#changevalidationlastname").text("Må skrive inn noe inn i etternavnet"); //Gir beskjed om å skrive inn etternavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(lastname)){ //Tester om fornavn inneholder noe annet enn bokstavene a-z og A-Z
        $("#changevalidationlastname").text("Ugyldig verdi - Vennligst skriv inn etternavn"); //Viser feilmelding hvis etternavn inneholder andre symboler, selv om det er bokstaver i etternavnet
        return false;
    } else {
        $("#changevalidationlastname").text(""); //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av endret telefonnummer
function changeValidationTelefonnr(telefonnr){
    if(!telefonnr){
        $("#changevalidationtelefonnr").text("Må skrive inn noe inn i telefonnr");
        return false;
    }
    else if(!/^\d{8}$/.test(telefonnr)) { //Viser feilmelding hvis telefonnummer inneholder andre symboler enn tall og om nummeret ikke består av 8 siffere
        $("#changevalidationtelefonnr").text("Ugyldig verdi - Telefonnummer må bestå av 8 siffer");
        return false;
    } else {
        $("#changevalidationtelefonnr").text("");
    }
    return true;
}

//Funksjon for validering av endret epostadresse
function changeValidationEmail(email){
    if(!email){
        $("#changevalidationemail").text("Må skrive inn noe inn i epost");
        return false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ //Bruker dette mønsteret til å sjekke om epostadresse er gyldid ved å følge formatet der brukernavn er først, så @, domenenavn og toppnivådomene
        $("#changevalidationemail").text("Ugyldig verdi - Vennligst skriv inn epost"); //Viser feilmelding hvsi epostadresse ikke er gyldig
        return false;
    } else {
        $("#changevalidationemail").text("");
    }
    return true;
}
