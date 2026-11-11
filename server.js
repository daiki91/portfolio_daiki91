const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const path = require("path");
const fs = require("fs");

const RAPPORTS_DIR = path.join(__dirname, "rapport");

// Lister tous les rapports PDF présents dans le dossier "rapport"
app.get("/api/rapports", async (req, res) => {
  try {
    const entries = await fs.promises.readdir(RAPPORTS_DIR, { withFileTypes: true });
    const pdfs = entries.filter(
      (entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === ".pdf"
    );

    const rapports = await Promise.all(
      pdfs.map(async (entry) => {
        const stats = await fs.promises.stat(path.join(RAPPORTS_DIR, entry.name));
        return {
          fichier: entry.name,
          url: "rapport/" + encodeURIComponent(entry.name),
          taille: stats.size,
          modifie: stats.mtime
        };
      })
    );

    rapports.sort((a, b) => a.fichier.localeCompare(b.fichier, "fr"));
    res.json(rapports);
  } catch (err) {
    if (err.code === "ENOENT") {
      return res.json([]);
    }
    console.error("Lecture du dossier rapport impossible :", err);
    res.status(500).json({ error: "Impossible de lire le dossier des rapports" });
  }
});

// Servir les fichiers statiques (images, CV PDF, etc.)
app.use(express.static(path.join(__dirname)));

// Servir le fichier HTML du CV
app.get("/cv", (req, res) => {
  res.sendFile(path.join(__dirname, "cv", "cv_arphan.html"));
});

// Messages en mémoire (temporaire)
let messages = [];


// Servir le portfolio à la racine
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
