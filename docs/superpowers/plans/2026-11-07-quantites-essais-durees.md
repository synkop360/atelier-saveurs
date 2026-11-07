# Quantités paramétriques et essais — plan d’implémentation

> Exécution en session avec `superpowers:executing-plans`, selon la conception validée.

**Objectif :** quantités structurées, essais redimensionnés, durées et corrections UI.
**Architecture :** conserver le monofichier natif, localStorage schema 1 et les anciens champs ; extensions optionnelles validées.
**Technologies :** HTML/CSS/JavaScript, Node test, Playwright/Chromium existants.
**Spécification :** `docs/superpowers/specs/2026-11-07-quantites-essais-durees-design.md` (validée).

## Contraintes

Aucune migration automatique ni perte des ingrédients libres. Instantanés indépendants.
Aucune conversion masse/volume ; les temps ne suivent pas le coefficient de quantité.
Aucun backend ni dépendance applicative. Recettes locales et exports préservés.

## Points de revue

- Quantités minuscules, décimales françaises, valeurs non finies : tester le parseur et l’affichage.
- Anciennes sauvegardes et champs optionnels invalides : tester les deux chemins d’import.
- Modification de cible avec ajustement manuel : tester persistance et retour au calcul.
- Retrait de ligne avec saisie en cours : vérifier en navigateur qu’aucun champ voisin ne disparaît.
- Écran étroit, labels longs et messages : contrôler aux largeurs 360, 390, 844 et 1280.

## Tâche 1 — Calcul et validation des extensions

Fichiers : `index.html`, `tests/helpers.cjs`, `tests/quantities.test.cjs`, `tests/app.test.cjs`.
Interfaces : `parseAmount(value,{nullable,zero,field})`, `convertQuantity(value,from,to)`,
`batchFactor(formulation,targetYield)`, `calculateBatch(formulation,batch)`,
`formatQuantity(number)`, `validateExtensions(data)`.

- [x] Écrire puis exécuter les tests en échec : 6→2 portions, 500 g→0,125 kg,
  1,2 g×0,5, unités incompatibles, null qualitatif, nombre minuscule et limites.
- [x] Implémenter les fonctions et validation des formulations, durées et batches.
- [x] Vérifier ancien JSON inchangé, nouveaux champs aller-retour et refus de
  valeurs/références invalides ; lancer `node --test --test-isolation=none tests/*.test.cjs`.
- [x] Commit de calculs et validation, suite verte.

## Tâche 2 — Édition, instantanés et exports

Fichiers : `index.html`, tests des nouvelles propriétés et instantanés.
Consomme les fonctions de la tâche 1 ; produit les extensions `formulation`,
`estimatedMinutes`, `snapshot.formulation`, `batch.targetYield/adjustments`.

- [x] Écrire les tests en échec : instantanés indépendants, vieux essai inchangé,
  temps et liste ajustée dans Markdown.
- [x] Ajouter champs de recette, activation explicite et rappel export ; lignes
  ajoutables/retirables, erreurs près des champs et conservation de la saisie.
- [x] Ajouter cible, facteur et quantités d’essai ajustables ; maintenir les
  ajustements lors d’un changement de cible et bouton retour au calcul.
- [x] Ajouter temps estimés modifiables et affichages recette/essai/archive.
- [x] Enrichir Markdown, rejouer suite et parcours navigateur, commit.

## Tâche 3 — Disposition, compatibilité PWA et livraison

Fichiers : `index.html`, `sw.js`, `tests/sw.test.cjs`, documentation existante.

- [x] Contrôler puis corriger disposition des titres/actions/navigation et champs,
  labels associés, verdicts français, boutons tactiles et notifications.
- [x] Tester Chromium : référence 6 portions, essai 2, ajustement 110 g puis cible 3,
  retour au calcul, persistance, temps, ancien JSON et JSON enrichi ; captures hors Git.
- [x] Rejouer ACCEPTANCE et tests SW ; incrémenter cache sans changer la clé des données.
- [x] Faire une revue indépendante de la branche et corriger les problèmes importants.
- [x] Mettre à jour données/documentation/bilan, pousser une PR puis intégrer et
  publier conformément à la demande validée ; vérifier URL et assets publics.

## Journal

- Exécution inline autorisée par la validation utilisateur ; la branche dédiée existe.
- Prévol : les interfaces sont partagées de 1 vers 2 ; aucune incohérence détectée.

- Tâches 1/2 : calculs, validation, instantanés, exports et formulaires terminés
  dans `1de79c0`, `37565c8`, avec tests en échec avant implémentation.
- Vérification finale : `86af88a` corrige le reset d’une saisie invalide et les
  ajustements chiffrés sans unité ; tests RED→GREEN, suite 25/25.
- Revue indépendante complète sur `86af88a` : aucun problème important restant.
- Parcours Chromium locaux et mise à jour PWA v3→v4 réussis ; publication vérifiée.
- Choix techniques conformes à la conception : extensions optionnelles schema 1,
  aucune migration ni conversion automatique ; masse/volume non interchangeables.

- Livraison : PR n°1 intégrée dans `bed676e`, Pages terminé avec succès ; HTTP 200
  et contenus des quatre assets vérifiés. Parcours enrichi public entièrement réussi.
- Limites : aucun test Android physique ni reconnaissance audio ; pas de plan de
  test culinaire, d’optimiseur ou de coûts implémenté : réflexion dans ROADMAP.md.
