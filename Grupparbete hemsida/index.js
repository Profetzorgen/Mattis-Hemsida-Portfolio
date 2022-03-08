const express = require("express");
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require("express-validator");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, "publikmapp")));
app.use(express.urlencoded({ extended: false }));
let bokningsArray = new Array();

app.post(
  "/request",
  body("antal").isNumeric().withMessage("Inmatning är inte en siffra"), 
  body("epost") 
    .isEmail()
    .withMessage("Inmatning är inte en giltig e-postadress"),
  (req, res) => {
    const nyBokning = {
      datum_received: req.body.datum,
      antal_received: req.body.antal,
      tid_received: req.body.tid,
      namn_received: encodeURIComponent(req.body.namn),
      epost_received: encodeURIComponent(req.body.epost),
      meddelande_received: encodeURIComponent(req.body.meddelande),
    };
    const dataTagetUrFil = fs.readFileSync("bokningar.json");
    bokningsArray = JSON.parse(dataTagetUrFil);

    const validering_resultat = validationResult(req);

    if (!validering_resultat.isEmpty()) {
      let valideringError = "";

      validering_resultat.array().forEach((error) => {
        valideringError += "\n" + error.msg;
      });

      console.log(valideringError);
    } else {
      // Det nya objektet läggs till i arrayen.
      bokningsArray.push(nyBokning);

      // Arrayen konverteras från JS-objekt till JSON-format och skrivs in i .json-fil.
      fs.writeFile(
        "bokningar.json",
        JSON.stringify(bokningsArray, null, 2),
        (err) => {
          if (err) throw err;
          console.log("En ny bokning har lagts till");
        }
      );
    }
  }
);

// Länkar vår "route" för admin-sidans innehåll till vår main index.js/resten av sidan.
app.use("/admin", require("./routes/adminWebsite"));
// Jag är server, en kort klase med kod, jag lyssnar på port 3000 och svarar
// på klienter (användarjäklarnas) anrop.
// <----- det syns här till vänster att nodemon startar om servern varje gång jag skrivit
// en endaste bokstav.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
