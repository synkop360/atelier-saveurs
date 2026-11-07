# atelier-saveurs


Carnet culinaire généraliste, utilisable sur mobile et ordinateur, pour documenter les recettes et améliorer les préparations au fil d'essais comparables.

**Version :** MVP 0.1 — prototype à tester. Le projet « Noël 2026 » et sept fiches d'essais sont inclus.

## Fonctionnalités

- Gestion des projets et recettes : création, modification et duplication
- Fiches techniques avec ingrédients, étapes et objectifs
- Journal d'essais versionnés, mesures, observations, notes et verdicts
- Historique et comparaison des essais
- Dictée vocale lorsque l'API de reconnaissance vocale est prise en charge ; sinon microphone du clavier mobile
- Export et import JSON ; export Markdown pour partager un compte rendu
- Interface responsive et PWA avec cache hors ligne

## Essayer l'application

**GitHub Pages** (une fois la publication activée) : https://synkop360.github.io/atelier-saveurs/

Pour exécuter localement :

```bash
python -m http.server 8000
```

Ouvrir http://localhost:8000 dans le navigateur. Aucun `npm install` ni build n'est nécessaire : la version MVP est réalisée en HTML, CSS et JavaScript natifs.

## Déploiement GitHub Pages

1. Dans le dépôt GitHub, ouvrir **Settings → Pages**.
2. Dans **Build and deployment**, sélectionner **Deploy from a branch**.
3. Choisir **main**, puis **/(root)** et enregistrer.
4. Attendre la fin du déploiement et ouvrir l'URL ci-dessus.

Les fichiers `index.html`, `manifest.webmanifest`, `sw.js` et `icon.svg` doivent se trouver à la racine de la branche `main`.

## Données personnelles et sauvegardes

Les données sont enregistrées **localement dans `localStorage` du navigateur**, et non dans GitHub. Elles ne sont pas synchronisées entre appareils. Utiliser régulièrement **Sauvegardes → Export JSON** : suppression des données du navigateur, navigation privée ou changement d'appareil peuvent entraîner leur perte. Éviter d'enregistrer des données sensibles dans ce prototype.

La reconnaissance vocale peut nécessiter une connexion et, selon le navigateur, faire appel à un service tiers. L'application ne conserve pas les fichiers audio.

## Structure

```text
index.html            # Application complète (MVP sans build)
manifest.webmanifest  # Métadonnées de l'application installable
sw.js                 # Cache hors ligne
icon.svg              # Icône
LICENSE               # Licence MIT
.gitignore            # Exclusions Git
.nojekyll             # Désactive le traitement Jekyll de GitHub Pages
```

## Évolutions envisagées

- Tests ergonomiques Android et amélioration de la dictée
- Synchronisation optionnelle et stockage plus robuste (IndexedDB)
- Comparaison graphique des essais et suivi des variables
- Export PDF et intégration à un packaging Android (par exemple via Capacitor)

## Licence

Distribué sous licence **MIT** — voir [LICENSE](LICENSE). Utilisation, modification et commercialisation autorisées sous réserve du maintien de l'avis de copyright et de licence. Les dépendances ou services tiers éventuellement ajoutés auront leurs propres conditions.
