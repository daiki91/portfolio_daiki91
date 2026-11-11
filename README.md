# Portfolio — Bodian Arphan Kaback Junior

## Lancer le site

```bash
npm install
node server.js
```

Le portfolio est disponible sur `http://localhost:5000`. Le CV peut être consulté sur `http://localhost:5000/cv`, téléchargé en PDF ou quitté avec le lien de retour au portfolio.

La section « Rapports » du portfolio affiche automatiquement tous les documents PDF du dossier `rapport` (via la route `/api/rapports`) : il suffit d’y déposer un nouveau PDF pour qu’il apparaisse. Pour lui donner un titre et une description personnalisés, ajoutez une entrée dans `reportDetails` dans `cv_arphan.html` ; sinon, le titre est déduit du nom du fichier.
