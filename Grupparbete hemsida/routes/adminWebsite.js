const express = require("express");
const fs = require("fs");
const { body } = require("express-validator");
const { unescape } = require("querystring");
// Som app = express i index.js fast router = express istället!
const router = express.Router();

router.use(express.urlencoded({ extended: false }));

/* Vi skriver bara "/" här med då det är underförstått att vi menar /admin
eftersom vi specificerade det näst längst ner i index.js när vi länkade till
den här routen. */
router.get("/", (req, res) => {
  res.sendFile("admin.html", { root: "./publikmapp" });
});

// Administratörens inloggningsuppgifter (högst improviserade).
const adminInlogg = {
  username: "PangAdmin",
  password: "Blåsfisk8Tvärsur",
};
// router = förlänging av index.js; serverskriptet.
router.post(
  "/",
  // Omvandlar ondskefull input till harmlösa HTML-escapes.
  body("username").escape(),
  body("password").escape(),
  (req, res) => {
    // Tar emot formuläret direkt utan klientskript-mellanhand vid submit.
    const mottagnaFormVar = {
      username: req.body.username,
      password: req.body.password,
    };

    let svarsText = "";

    // Kollar om användarnamnet stämmer.
    if (mottagnaFormVar.username !== adminInlogg.username) {
      console.log("Misslyckad inloggning: Användaren finns inte.");
      fs.readFile("./publikmapp/admin.html", (err, data) => {
        let nyHTML = data
          .toString()
          .replace("Logga in för att se bokningar.", "FEL USER INPUT");

        res.send(nyHTML);
      });
    }
    // Kollar om lösenordet matchar användarnamnet.
    else if (
      mottagnaFormVar.username === adminInlogg.username &&
      mottagnaFormVar.password !== adminInlogg.password
    ) {
      console.log(
        "Misslyckad inloggning: Användarnamn och lösenord överensstämmer inte."
      );
      fs.readFile("./publikmapp/admin.html", (err, data) => {
        let nyHTML = data
          .toString()
          .replace("Logga in för att se bokningar.", "FEL BÅDA INPUT");

        res.send(nyHTML);
      });
      // Inget utslag än? Allting matchade! I choose you, ELSE!
    } else { // Dvs: när inget är fel med admin/pass: körs kod här under.
      const bokningarFultFormat = JSON.parse(fs.readFileSync("bokningar.json"));
      let bokningarSnyggtFormat = "";

      // Gör om arrayen med bokningsinfo till en något mer stilfull sådan.
      for (let y = 0; y < bokningarFultFormat.length; y++) {
        bokningarSnyggtFormat +=
          "Datum: " +
          bokningarFultFormat[y].datum_received +
          "<br>" +
          "Antal: " +
          bokningarFultFormat[y].antal_received +
          "<br>" +
          "Tid: " +
          bokningarFultFormat[y].tid_received +
          "<br>" +
          "Namn: " +
          decodeURIComponent(bokningarFultFormat[y].namn_received) +
          "<br>" +
          "E-post: " +
          decodeURIComponent(bokningarFultFormat[y].epost_received) +
          "<br>" +
          "Ev. meddelande: " +
          decodeURIComponent(bokningarFultFormat[y].meddelande_received) +
          "<br><br>";
      }
      // Ordnar filens info till data-form för att kunna ändrad hemsida/data.
      fs.readFile("./publikmapp/admin.html", (err, data) => {
        let nyHTML = data
          .toString()
          .replace("Logga in för att se bokningar.", bokningarSnyggtFormat);

        res.send(nyHTML);
      });
    }
  }
);
// Detta gör att denna fil räknas som en förlängning av index.js dvs serverskriptet.
module.exports = router;
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass