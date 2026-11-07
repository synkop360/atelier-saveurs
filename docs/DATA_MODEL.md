# Modèle métier et persistance — état MVP

## Objets
- **Projet** : identifiant, nom, groupe de recettes (exemple initial « Noël 2026 »).
- **Recette** : identifiant, projet, nom, catégorie, objectif, ingrédients, étapes, mesures attendues, variantes et date de création. La recette de référence reste distincte des essais.
- **Essai** : identifiant, référence à la recette, version (V1, V2...), date, instantané éventuel de la recette, changement testé, mesures, observations, notes, verdict, étapes réalisées.
- **Évaluation** : notes liées à l'essai (goût, texture, arômes, faisabilité, cohérence, accord vin lorsque pertinent), appréciation et décision.

## Implémentation actuelle
Le code stocke un objet JSON dans `localStorage`. Lire les noms de propriétés exacts dans `index.html` avant d'ajouter une migration. Les champs et l'interface ne sont pas encore contractualisés en TypeScript/JSON Schema. **Ne pas présenter IndexedDB comme déjà présent.**

## Invariants
1. Un essai historique doit rester interprétable même si la recette de référence change.
2. L'utilisateur doit pouvoir exporter ses données avant toute migration.
3. Les modifications d'une version ne doivent pas modifier silencieusement les autres versions.
4. Le projet « Noël 2026 » est un jeu de départ ; l'application doit accepter d'autres projets.
5. Les données privées ne doivent jamais être commitées ni envoyées automatiquement à un serveur.

## Migration future (non demandée dans P0)
Introduire `schemaVersion`, validation d'import, migrations idempotentes et sauvegarde préalable ; IndexedDB seulement si les limites de localStorage sont réellement gênantes.
