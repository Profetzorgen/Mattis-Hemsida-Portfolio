// Resebokningen.

$(document).ready(function() {
// variabler som används för att manipulera text bland annat.
let namn;
let telefonnummer;
let postnummer;
let postadress;
let password ="";
let ePost;
let passlabel;
document.getElementById("Resebokningen").addEventListener("submit", function(evt) { // eventHandler för formuläret
    evt.preventDefault(); // stanna kvar, försvinn inte från skärmen!
    namn = document.getElementById("Namn");  // kopplar alla variabler med inputrutorna från html/hemsidan.
    telefonnummer = document.getElementById("Telefonnummer");
    postnummer = document.getElementById("Postnr");
    postadress = document.getElementById("PostAdress");
    password = document.getElementById("pass");
    ePost = document.getElementById("ePost");
    if(                                    // inuti en if-statement för att få upp ett Alert när man väl skrivit in rätt.
    kollaEpost(console.log("Epost: ")) +  // och skriver ut i konsollen för överblick när man anropat alla funktioner.
    kollaNamn(console.log("Namn: ")) +
    kollaTele(console.log("Telefonnummer: ")) +
    kollaPostNr(console.log("Postnummer: ")) +
    kollaPostAdress(console.log("Postadress: ")
    ==true))
    {
        alert("Grattis du skrev in allt rätt!");
    }
    kollaPassword(console.log("Lösenord: " +password.value)); // denna spökar lite, tål att förbättras, utelämnad från övrig "grattis" -alert kod.
});
let regexBokstaver = /[a-öA-Ö]$/; // lite regex för att jämföra med, finns mer specifikt om man vill.
let regexMail = /.+@.+\..+/;
let regexSiffror = /[0-9]$/;

let regexTest = function(reg, str) { // Holgers regexTest, kör med den för att kolla mot regex - variablerna.
    // anropa metoden "test" för att kolla att textsträngen str matchar formatet reg
    if (reg.test(str)) {
        console.log(str + " - Är Ok!");
        return true;
    }
    else {
        console.log(str + " - Är fel!");
        return false;
    }
}
let kollaNamn = function(){                     // Kollar igenom varje inmatning mot regex via funktionsanrop
    let namnLabel = document.getElementById("NamnLabel");  // och modifierar label-texten för alla rutor.
    if(!regexTest(regexBokstaver,namn.value)){          // hade säkert blivit kortare kod om jag suttit mer med jQuery.
        namnLabel.innerHTML = "Fel namnformat!";
    }
    else {
        namnLabel.innerHTML = "Namn";
        return true;
    } 
}
let kollaTele = function(){ // längden på telefonnumret
    let teleLabel = document.getElementById("TelefonnummerLabel");
    if(telefonnummer.value.length != 10){   // kollar mobilnr-längd.
        teleLabel.innerHTML = "Telefonnumret ska vara ett mobilnr, 10 siffror!";
    }
    else if(!regexTest(regexSiffror,telefonnummer.value)){ // kollar att det bara är siffror.
        teleLabel.innerHTML = "Fel telefonnummerformat! skriv in ett mobilnummer!";
    }
    else {
        teleLabel.innerHTML = "Telefonnummer: " // när det blir rätt, återställs label.
        return true;
    }
}
let kollaPostNr = function () {         // varje "kolla" - funktion fungerar ungefär likadant.
    let postNrLabel = document.getElementById("PostLabel");
    if(!regexTest(regexSiffror,postnummer.value)){
        postNrLabel.innerHTML = "Fel postnummerformat! skriv in 5 siffror!";
    }
    else {
        postNrLabel.innerHTML = "Postnummer: ";
        return true;
    }
}
let kollaPostAdress = function () {
    let postAdressLabel = document.getElementById("PostAdressLabel");
    if(!regexTest(regexBokstaver,postadress.value)){
        postAdressLabel.innerHTML = "Fel postadressformat! skriv bara med bokstäver!";
    }
    else {
        postAdressLabel.innerHTML= "Postadress: ";
        return true;
    }
}
// funkar sisådär, men mata in en gång till och tryck på skicka, då ändrar den texten.
// var lite annorlunda att kolla length med jQuery.
let kollaPassword = function(){
    $('#pass').on('blur', function(){
        passlabel = document.getElementById("passLabel");
        if(this.value.length < 8 ){
            passlabel.innerHTML = "Lösenordet måste vara minst 8 tecken långt.";
        }
    });
}
let kollaEpost = function(){
    let epostLabel = document.getElementById("ePostLabel");
    if(!regexTest(regexMail,ePost.value)){
        epostLabel.innerHTML = "Fel ePostformat!";
    }
    else {
        epostLabel.innerHTML = "ePost: "
        return true;
    }
}
// Holgers kod, hann inte kolla om jag behövde justera något, verkar fungera.
let avresa = null;  // globalt definierad variabel inom window.onload
let hemresa = null; // dito
document.getElementById("avresa").addEventListener("submit", function(evt) {
    evt.preventDefault();   // hindra att sidan laddas om
    let input = document.getElementById("avresedatum").value;
    console.log(input);
    avresa = new Date(input);   // gör om till ett Date-objekt
    if (hemresa && hemresa < avresa) {
        alert("Hemresa måste vara efter avresa!");
        console.log("Hemresa måste vara efter avresa!");
    }
});
document.getElementById("hemresa").addEventListener("submit", function(evt) {
    evt.preventDefault();   // hindra att sidan laddas om
    let input = document.getElementById("hemresedatum").value;
    console.log(input);
    hemresa = new Date(input);   // gör om till ett Date-objekt
    if (avresa && hemresa < avresa) {
        alert("Hemresa måste vara efter avresa!");
        console.log("Hemresa måste vara efter avresa!");
    }
});
});