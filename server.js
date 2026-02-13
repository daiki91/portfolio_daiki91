const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const path = require("path");

// Servir le fichier HTML du CV
app.get("/cv", (req, res) => {
  res.sendFile(path.join(__dirname, "cv_arphan.html"));
});

// Messages en mémoire (temporaire)
let messages = [];


// Servir le CV directement à la racine
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "cv_arphan.html"));
});

// Récupérer messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Ajouter message
app.post("/messages", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Message vide" });
  }

  messages.unshift({
    id: Date.now(),
    content
  });

  res.json({ success: true });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Serveur lancé sur http://localhost:" + PORT);
});
