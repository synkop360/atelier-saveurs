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
notes. Masse : mg/g/kg ; volume : ml/cl/l ; autres unités : lot, portion, pièce,
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


### Conversion explicite des listes libres (0.2.1)

Les nouvelles données de départ incluent des formulations revues à partir des
listes originales, sans changer ces listes. Le rendement `1 lot` n’est pas une
portion inventée : il désigne exactement le lot original. Un rendement explicite
est utilisé lorsque les étapes précisent 6 pièces.

Pour les données déjà présentes, `proposeConversion` travaille sur une copie,
préserve intégralement les recettes structurées, les champs existants et les essais,
et valide le résultat. La vue d’aperçu ne sauvegarde rien. L’application est un clic
explicite qui exporte d’abord le JSON actuel puis passe par le stockage protégé.
En cas d’échec, l’aperçu reste ouvert ; aucun faux succès n’est affiché.

Les recettes de départ identifiées par nom, liste et étapes originales ont une
conversion détaillée (sarrasin séparé en 25 g de liaison et 95 g de grains, marinade
et panure décomposées). Pour les autres listes, seules les expressions simples
quantité + unité massique/volumique sont interprétées ; les expressions composées
restent en texte intégral. Les plages gardent leur borne basse chiffrée et leur
fourchette de référence en note. Les lignes non chiffrées ne sont pas arbitrairement
étiquetées « au goût » : elles sont affichées « Quantité à préciser », sauf indication
explicite « au goût ».


## Plans de test — extension optionnelle 0.3

`testPlans` est facultatif au niveau racine. Son absence n’entraîne aucune écriture
ni migration. Les plans utilisent les mêmes sauvegardes et transactions `save`.

- Plan : id, projectId, name, objective, hypothesis, conditions, criteria, conclusion,
  status (`active`/`archived`), createdAt, updatedAt, components, preparations,
  tastings, sourceIds et template (`dessert` ou null).
- Critère : id et nom. Les notes de dégustation associent chaque id à un nombre
  fini entre 0 et 10 ou `null`. Un critère utilisé ne change pas de sens en silence.
- Composant : id, nom, recipeId et `reference`, copie indépendante de la recette ;
  `variants` contient id, nom, included, changes, ingredientEdits et targetYield.
  Les adaptations référencent les ids de lignes et peuvent changer nom, quantité,
  unité et note ; leur matérialisation produit la fiche effective de la variante.
- Préparation : id, nom, componentId, variantId, targetYield et trialId (null avant
  réalisation). Une variante absente ne crée pas de préparation. Un lot n’est lié
  qu’à un essai et le même essai ne représente pas plusieurs lots distincts.
- Dégustation : id, nom, selections (componentId, variantId, preparationId ou null
  pour absence), status (`planned`/`completed`/`skipped`), date, observations,
  scores et verdict. Un seul choix par composant. Plusieurs dégustations peuvent
  pointer sur le même lot sans dupliquer son essai.
- Essai : extension optionnelle `planContext` identifiant plan, préparation,
  composant, variante et libellés de provenance. Le snapshot est la formulation
  effective figée, distincte de la référence courante de la bibliothèque.

L’enregistrement d’un essai copie db, ajoute l’essai et lie la préparation dans
la même écriture. Le rendement du lot est synchronisé avec celui réellement
sauvegardé dans l’essai. Une annulation ne change aucun objet enregistré.

L’import valide tous les liens, les snapshots, les états, les nombres et les notes.
La suppression d’un essai référencé est bloquée, y compris si le plan est archivé.
Les structures utilisées sont protégées ; nouvelles variantes/lots et duplication
permettent de poursuivre sans réécrire le passé. La duplication remappe les ids
internes et supprime résultats, dates de dégustation et liens d’essai, sans modifier
les références sources.

Le modèle dessert crée deux fiches élémentaires nouvelles ; l’original composé
reste intact. Les durées de la fiche composée ne sont pas inventées pour ses
éléments. Les procédures connues sont découpées explicitement : griottes = chauffe
et réduction ; tuile = étalage et cuisson. Les procédures personnelles ne sont
pas interprétées par un filtre de mots-clés : un plan libre conserve leur sens.


### Ajustements individuels des lots (0.3.1)

Une préparation peut ajouter `adjustments`, objet associant id de ligne à une
quantité positive finie ou `null`. Son absence dans les anciens documents signifie
aucun ajustement, sans migration. Les clés doivent exister dans la formulation
effective de la variante. Les valeurs calculées restent dérivées ; seul le
rendement cible et les ajustements sont persistés.

L’essai démarre avec `batch.targetYield` et `batch.adjustments` issus du lot.
L’enregistrement de l’essai synchronise ces deux valeurs vers sa préparation dans
la même transaction. Les lots réalisés restent protégés. La copie d’un lot réalisé
prend les valeurs de l’essai réel, même si l’ancien lot n’avait pas encore de champ
`adjustments`, puis retire le lien d’essai pour obtenir un nouveau lot indépendant.

Si une variante ou sa référence change les unités d’une ligne ajustée, la quantité
manuelle est convertie entre unités compatibles avant sauvegarde. Une unité
incompatible ou un ingrédient ajusté disparu bloque toute la transaction ; aucun
changement partiel n’est enregistré. Les ajustements restent fixes lors du simple
changement de rendement. Les exports de lots prévus utilisent les quantités
effectives et signalent les ajustements manuels, comme les essais réalisés.


### Réglages d’optimisation (0.4)

`plan.optimization` est facultatif. Son absence ne provoque aucune écriture.
Il contient `mode` (`pairs`/`full`), `operation` (`complete`/`rearrange`),
`factors` (componentId, variantIds), `exclusions` (listes de choix componentId,
variantId), `lots` (componentId, variantId, preparationId ou `new`) et
`pinnedTastingIds`. Les références sont validées à l’import et remappées lors
de la duplication. Réinitialiser explicitement ces réglages permet de retirer une
référence utilisée, sans supprimer de lot ni de résultat.

Les univers, couvertures, solutions et preuves sont dérivés et non persistés.
Une absence explicite est une variante, distincte d’un composant non testé.
Les paires ne sont des cibles que si elles peuvent s’étendre à un assemblage
complet réalisable ; les lignes non réalisées ne contribuent pas à la couverture.
Une ligne partielle ne couvre que ses choix explicites. Les exclusions ne réécrivent
pas l’historique incompatible : ces lignes sont signalées hors univers.

L’aperçu porte une copie du plan initial. L’application refuse un plan archivé ou
modifié depuis le calcul, valide une copie complète de la base puis effectue une
seule écriture. Les nouveaux lots sont créés une fois par variante utilisée ;
aucune quantité existante n’est modifiée. Le remplacement de lignes vierges
commence par le téléchargement d’une sauvegarde. Toute date, observation, note,
verdict renseigné ou état autre que prévu protège la ligne.
