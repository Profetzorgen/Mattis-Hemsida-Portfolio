// Övning 1 till 6
window.onload = function()
{
    
//UPPGIFT 1:
let uppgiftEtt = function(){
    let summa = 0;

    for(let i = 1; i <= 10; i++){
         summa = i * i;
        console.log("Nr: " + summa ); 
    }
}
let uppgiftEttKlick = document.getElementById("u1"); // varje uppgift aktiveras såhär, via klick på dess text.
uppgiftEttKlick.addEventListener("click", uppgiftEtt);

//UPPGIFT 2:
let uppgiftTva = function(){
    tal1 = 0;
    tal2 = 0;
    for(let i = 1; i <= 10; i++){ // ökar det första talet "i" en gång för var 10e gång det andra talet "j" ökas.
        tal1 = i;
        for(let j = 1; j <= 10; j++){
            tal2 = j;
            console.log(i+" gånger "+j+" = "+i*j);
        }
    }
}
let uppgiftTvaKlick = document.getElementById("u2");
uppgiftTvaKlick.addEventListener("click", uppgiftTva);

//UPPGIFT 3:
let uppgiftTre = function(){
    let antalGissningar = 0;
    let answer = Math.floor(Math.random() * 100 + 1);
    let gissning = prompt("Gissa ett tal mellan 1 och 100: ");
    let spelar = true;
    while(spelar && gissning != null){ // en snabb googling lärde mig hur Cancel knappen aktiveras :D den returnerar null vid klick
      
        if(gissning == answer){
            alert("Grattis! du gissade rätt svar på "+antalGissningar +" försök! \n" + answer + " är rätt svar!"
            );
            spelar=false;
        }
            else if(gissning<answer){
                antalGissningar++;
                gissning = prompt("För lågt! gissa igen: " + "Du har gissat: " + antalGissningar +" gånger.");
            }
            else if(gissning>answer){
                antalGissningar++;
                gissning = prompt("För högt! gissa igen: " + "Du har gissat: " + antalGissningar +" gånger.");
            }
    }
}
let uppgiftTreKlick = document.getElementById("u3");
uppgiftTreKlick.addEventListener("click", uppgiftTre);

// UPPGIFT 4:
let uppgiftFyra = function(){
    let konsonantLista = "bcdfghjklmnpqrstvwxz"; // Alla konsonanter som finns i alfabetet.
    let konsonanter =[...konsonantLista]; // Array aka Fält, en bokstav i varje indexplats.
    let mening = prompt("Skriv in en mening: "); // Som det låter, ber användaren skriva in och sparar variabeln.
    mening = mening.toLowerCase(); // Små bokstäver för att jämförelsen ska bli rätt.
    let deladMening = [...mening];  // Användarens inmatade mening delas upp bokstavsvis i ett fält.
    let rovarMening = ""; // Rövarspråksmeningen som ska skrivas ut.
    
    // Nästlad for-loop, tar varje bokstav från fältet deladMening och lägger till i rövarspråksmeningen...
    //... och om det är en konsonant, lägg dessutom till bokstaven "o" sedan konsonanten igen för att skapa rövarspråket.
    for(let i = 0; i < deladMening.length;i++ ){ // Den yttre loopen sköter en bokstav åt gången.
       rovarMening+= deladMening[i];  
        for(let j = 0; j < konsonanter.length; j++){ // Den inre lägger även till "o" och en extra konsonant.
            if(deladMening[i] == konsonanter[j]){
                rovarMening += "o" +deladMening[i];
            }        
        }
    }
    function storFörstaBokstav(string){ // För stylingen.
       return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    console.log("konsonanter= " + konsonanter);
    console.log("mening= " +mening);
    console.log("deladMening= " + deladMening);
    console.log("rovarMening= " + rovarMening);
    alert(storFörstaBokstav(rovarMening));
}
let uppgiftFyraKlick = document.getElementById("u4");
uppgiftFyraKlick.addEventListener("click", uppgiftFyra);
} // slutklammer för window.onload, hade jag den någon annastans fick programmet krupp deluxe.

// Uppgift 5
let uppgiftFem = function(){
    let personer = ""; // dessa översta 2 är bara extragrejer, förklaring längre ner.
    let personArray = [personer.split("|")];
    
    class Person{  // klassen person med 3 attribut, 2 metoder.
      constructor(namn,ålder,hemstad){
          this.namn;
          this.ålder;
          this.hemstad;
      }
      hälsa = function(){
              console.log(this.namn+" är vid god hälsa!");
          
      }
      ledig = function(){
              console.log(this.namn +" är ledig för tillfället!"); 
      }
    }
    
    class Student extends Person{  // klassen Student, ärver namn,ålder,hemstad från person och lägger till betyg + handledare.
      constructor(namn,ålder,hemstad,betyg,handledare){ 
          super(namn, ålder, hemstad);
          this.betyg;
          this.handledare;
      }
      studera = function(){ // 3 metoder till, skriver bara ut i konsollen. går att göra i stort sett vad som helst egentligen.
          console.log(this.namn + " sitter och pluggar.")
      }
      lunch = function(){
          console.log(this.namn + " är  på lunch.");
      }
      kvartssamtal = function(){
          console.log(this.namn + " är på möte/kvartssamtal med " + this.handledare);
      }
    }
    // Identifierar vad som är vad på hemsidan genom att länka id i HTML till variabler i JS.
    let enRubrik = document.getElementById("Rubrik"); // används ej, lät stå kvar.
    let nyPerson = document.getElementById("NyPerson");
    let personHälsa = document.getElementById("PersonHälsa");
    let personLedig = document.getElementById("PersonLedig");
    let studentStuderar = document.getElementById("StudentStuderar");
    let studentLunchar = document.getElementById("StudentLunchar");
    let studentSamtal = document.getElementById("StudentSamtal");
    
    // Den här funktionen provade jag bara för att se om jag kunde lägga till och dela på text...
    //...till ett fält/array från användarinput. Det tycks fungera! 
    let skapaPerson = function(){
      let temp = new Person();
      temp.namn = prompt("Namn på personen: ")+", ";
      temp.ålder = prompt("Ålder: ")+", ";
      temp.hemstad = prompt("Hemstad: ")+"|"; // Delar på personer med en "stolpe".
      personer += temp.namn + temp.ålder + temp.hemstad;
      personArray = [personer.split("|")]; // uppdaterar arrayen så den nya personen kommer med...
      console.log(personArray); // och skriver ut personlistan i konsollen.
    }
    
    
    // Skapar en ny Person via mallen, namn, ålder och hemstad dyker upp i konsol för bekräftelse,
    // vid klick på respektive textrad på hemsidan, ser du personens hälsa och om denne är ledig, i textform.
    let b= new Person();
    b.namn = "Glenn Hysén";
    b.ålder = 62;
    b.hemstad = "Göteborg.";
    console.log("Namn: " + b.namn);
    console.log("Ålder: " + b.ålder);
    console.log("Hemstad: " + b.hemstad);
    let personKoll = function(){
        b.hälsa();
    }
    let ledigKoll = function(){
        b.ledig();
    }
    ////////////////////////////////////////////////////////////////////
    // fungerande student-kod med kontroller till.
    let c = new Student();
    c.namn = "Erik Svensson";
    c.ålder = 23;
    c.hemstad = "Luleå";
    c.betyg = "A";
    c.handledare = "Hildegaard Wachtmeister";
    console.log("Namn: " + c.namn);
    console.log("Ålder: " + c.ålder);
    console.log("Hemstad: " + c.hemstad);
    console.log("Betyg: " + c.betyg);
    console.log("Handledare: " + c.handledare);
    let studentStudier = function(){
      c.studera();
    }
    let studentLunch = function(){
      c.lunch();
    }
    let studentMöte = function(){
      c.kvartssamtal();
    }
    //////////////////////////////////////////////////////////////////////
    nyPerson.addEventListener("click", skapaPerson);
    personHälsa.addEventListener("click", personKoll);
    personLedig.addEventListener("click", ledigKoll);
    studentStuderar.addEventListener("click", studentStudier);
    studentLunchar.addEventListener("click", studentLunch);
    studentSamtal.addEventListener("click", studentMöte);
}
let uppgiftFemKlick = document.getElementById("u5");
uppgiftFemKlick.addEventListener("click", uppgiftFem);

// Uppgift 6 
function uppgiftSexA(form) { // formulär som inparameter. observera html-"onclick" - kommandot i GrundSyntaxHtml.html, rad 46. = finns inga eventHandlers.
    let konsonantLista = "bcdfghjklmnpqrstvwxz"; // Alla konsonanter som finns i alfabetet.
    let konsonanter =[...konsonantLista]; // Array aka Fält, en bokstav i varje indexplats.
    //let mening = prompt("Skriv in en mening: "); 
    var mening = form.inputbox.value; // Meningen som ska ändras, från textboxen.
    var textSvar = document.getElementById("rovarSvar"); //Hittar textraden i html.

    mening = mening.toLowerCase(); // Små bokstäver för att jämförelsen ska bli rätt.
    let deladMening = [...mening];  // Användarens inmatade mening delas upp bokstavsvis i ett fält.
    var rovarMening = ""; // Rövarspråksmeningen som ska skrivas ut.
    
    // Nästlad for-loop, tar varje bokstav från fältet deladMening och lägger till i rövarspråksmeningen...
    //... och om det är en konsonant, lägg dessutom till bokstaven "o" sedan konsonanten igen för att skapa rövarspråket.
    for(let i = 0; i < deladMening.length;i++ ){ // Den yttre loopen sköter en bokstav åt gången.
       rovarMening+= deladMening[i];  
        for(let j = 0; j < konsonanter.length; j++){ // Den inre lägger även till "o" och en extra konsonant.
            if(deladMening[i] == konsonanter[j]){
                rovarMening += "o" +deladMening[i];
            }        
        }
    } // Varför inte göra första bokstaven stor för designens skull? 
    function storFörstaBokstav(string){
       return string.charAt(0).toUpperCase() + string.slice(1);
    }
    textSvar.innerHTML = "Rövarspråk: " + storFörstaBokstav(rovarMening);
}
let answer;
let antalGissningar = 0; // Gissningsräknare, för stylingen.

function uppgiftSexB(form){
    let gissning = form.gissabox.value; // lite ändringar jämfört med prompt-versionen.
    let gissningsFeedback = document.getElementById("gissningsFeedback"); // hittar feedbacktext i html...
    let spelar = true;
    let svar = answer;
    if(spelar == true){
        if(gissning == svar){
            ++antalGissningar;
            gissningsFeedback.innerHTML= "Grattis! du gissade rätt svar på "+antalGissningar +" försök! \n" + answer + " är rätt svar!";
            spelar=false;
        }
        else if(gissning<svar){
            antalGissningar++;
            gissningsFeedback.innerHTML = "För lågt! gissa igen: " + "Du har gissat: " + antalGissningar +" gånger."; 
            spelar = true;
        }
        else if(gissning>svar){
            antalGissningar++;
            gissningsFeedback.innerHTML = "För högt! gissa igen: " + "Du har gissat: " + antalGissningar +" gånger.";
            spelar = true;
        } 
    }
}
let uppgiftSexBMain = function () { // gissningshanterare
    antalGissningar = 0;
    gissningsFeedback = document.getElementById("gissningsFeedback");
    answer = Math.floor(Math.random() * 100 + 1); // ny random siffra vid anrop.
    gissningsFeedback.innerHTML = "Du har startat ett nytt spel! Rätt svar i konsollen.";
    console.log(answer);
}