 // Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
$(document).ready(function () { // Window.onload på jQueriska.
  $("#booking").submit(function (event) {
    let datum = document.getElementById("datum").value;
    let antal = document.getElementById("antal").value;
    let tid = document.getElementById("tid").value;
    let namn = document.getElementById("namn").value; 
    let epost = document.getElementById("epost").value;
    let meddelande = document.getElementById("meddelande").value;
    let felmeddelande = "";
    let regexName =
      /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i; // Namntestets regex.

    let namnTest = function (reg, str) { // Jämför namn mot regex.
      if (reg.test(str)) {
        console.log(namn + " är ett OK namn!");
        return true;
      } else {
        alert(namn + " är FEL sorts namn, förnamn efternamn ska det va!");
        console.log(namn + " är FEL sorts namn, förnamn efternamn ska det va!");
        return false;
      }
    };

    let datumTest = function () {
      dt = new Date().toISOString().split(".")[0].replace(/[^\d]/gi, ""); // skapar datum utan symboler, bara siffror.
      dagensdatum = dt.substring(0, 8); // Endast ååååmmdd, inte mikrosekunder etc.
      dagenstid = dt.substring(9, 12); // Endast hhmm.
      formateradTid = tid.toString().split(".")[0].replace(":", ""); // tid utan krimskrams
      formateratDatum = datum.toString().split(".")[0].replace(/[^\d]/gi, ""); //datum utan krimskrams

      if (formateratDatum >= dagensdatum) {
        console.log("Datum OK!");
        return true;
      } else {
        alert("Datum måste vara efter dagens datum");
        console.log("Datum och Tid ERROR!");
        return false;
      }
    };
    // Den här valideras automatiskt i html men funktionen låter vi vara ifall webbläsaren är av typen som ej klarar det.
    let emailTest = function () {
      if (validator.isEmail(epost)) {
        console.log("Mail är OK!");
        return true;
      } else {
        alert("Fel på mailformat, försök igen");
        console.log("Mail ERROR!");
        return false;
      }
    };

    let inlaggJustering = function () {
      // Anti-ful -input. Gör om < till &;amp eller vafan det brukar va.
      // Gör det med inlägg just nu, ska implementera överallt strax..
      meddelande = validator.escape(meddelande);
    };
   
    // Under: kollar att alla returnar = true, && för att varenda en ska stämma innan det skickas iväg
    if (
      datumTest() == true && // Innehåller både tid och datum, använder bara datum-delen.
      namnTest(regexName, namn) == true && 
      emailTest() == true
    ) {
      inlaggJustering(); 
      $.post( // Json-format.
        "/request",
        {
          datum: datum,
          antal: antal,
          tid: tid,
          namn: namn,
          epost: epost,
          meddelande: meddelande,
        },
        function (data, status) {
   
          console.log(data); 
        }
      );

      console.log( // Skriver ut i konsol för enkel överblick vid t ex. felsökning.
        "Datumvariabel: " +
          datum +
          "\nAntalvariabel: " +
          antal +
          "\nTidvariabel: " +
          tid +
          "\nNamnvariabel: " +
          namn +
          "\nE-postvariabel: " +
          epost +
          "\nMeddelandevariabel: " +
          meddelande
      );

      alert("Din bokning har skickats!"); // Lyckad bokning.
    } else {
      event.preventDefault();
      console.log("Något stämmer inte, bokningen har ej skickats."); // Misslyckad bokning.
    }
  });
});

// DETTA SKRIPT SKA SKICKA INFO TILL INDEX.JS EFTER VALIDERING, SEDAN FÅ TBX SVAR
// MED UPPDATERAD HEMSIDA.
//1. DENNA SIDA TAR IN INFORMATION.
//2. DENNA SIDA VALIDERAR INFON.
//3. DENNA SIDA SKICKAR IFALL VALIDERING OK, INFO TILL SERVER SOM JSON.
//4. SE INDEX.JS
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
