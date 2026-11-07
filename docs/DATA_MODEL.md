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

## Extensions optionnelles — version quantités et durées

Le schéma reste `schema: 1` et la clé `atelier-saveurs-v1` reste inchangée.
Aucune migration n’est lancée au chargement. Une recette ancienne sans ces champs
reste valide. Les listes libres `ingredients` sont conservées et ne sont pas
interprétées automatiquement.

Une recette peut porter :

```json
{
  "formulation": {
    "yield": { "quantity": 6, "unit": "portion" },
    "ingredients": [
      { "id": "farine", "name": "Farine", "quantity": 300, "unit": "g", "note": "" },
      { "id": "sel", "name": "Sel", "quantity": null, "unit": "", "note": "au goût" }
    ]
  },
  "estimatedMinutes": { "preparation": 15, "cooking": 30, "resting": 60, "total": 90 }
}
```

Le rendement est strictement positif. Les identifiants de lignes sont uniques dans
la formulation. Une quantité `null` est qualitative ; les plages restent dans les
notes. Masse : mg/g/kg ; volume : ml/cl/l ; autres unités : portion, pièce,
c. à café, c. à soupe, pincée. Aucune conversion entre familles ni densité implicite.
Les nombres sont stockés sans arrondi d’affichage ; point et virgule sont acceptés
par le formulaire. Les limites numériques non finies sont rejetées.

Un nouvel essai structuré copie la formulation dans `snapshot.formulation`, puis
ajoute par exemple :

```json
{
  "batch": {
    "targetYield": { "quantity": 2, "unit": "portion" },
    "adjustments": { "farine": 110 }
  },
  "estimatedMinutes": { "preparation": 15, "cooking": 35, "resting": 60, "total": 90 }
}
```

La quantité automatique de farine est ici 100 g ; l’ajustement explicite produit
110 g. L’ajustement reste fixe lors d’un changement de cible jusqu’à « Revenir au
calcul ». Les références d’ajustement doivent exister dans l’instantané. L’archive
est toujours calculée depuis cet instantané, jamais depuis la référence courante.
Les anciens essais ne reçoivent pas de formulation reconstituée.

Les temps sont en minutes ; `null` signifie inconnu et zéro signifie aucune durée.
Le total explicite peut tenir compte de chevauchements. En son absence, si les trois
sous-temps sont connus, leur somme est affichée comme telle, sans la persister comme
total confirmé. Aucune durée ni température n’est multipliée par le facteur.

Les exports JSON conservent intégralement ces champs. Les exports Markdown donnent
les quantités effectives, les ajustements, les temps et le verdict français. Les
imports valident les extensions quand elles sont présentes avant tout remplacement.
