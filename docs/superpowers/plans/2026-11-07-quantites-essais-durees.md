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

- [ ] Écrire puis exécuter les tests en échec : 6→2 portions, 500 g→0,125 kg,
  1,2 g×0,5, unités incompatibles, null qualitatif, nombre minuscule et limites.
- [ ] Implémenter les fonctions et validation des formulations, durées et batches.
- [ ] Vérifier ancien JSON inchangé, nouveaux champs aller-retour et refus de
  valeurs/références invalides ; lancer `node --test --test-isolation=none tests/*.test.cjs`.
- [ ] Commit de calculs et validation, suite verte.

## Tâche 2 — Édition, instantanés et exports

Fichiers : `index.html`, tests des nouvelles propriétés et instantanés.
Consomme les fonctions de la tâche 1 ; produit les extensions `formulation`,
`estimatedMinutes`, `snapshot.formulation`, `batch.targetYield/adjustments`.

- [ ] Écrire les tests en échec : instantanés indépendants, vieux essai inchangé,
  temps et liste ajustée dans Markdown.
- [ ] Ajouter champs de recette, activation explicite et rappel export ; lignes
  ajoutables/retirables, erreurs près des champs et conservation de la saisie.
- [ ] Ajouter cible, facteur et quantités d’essai ajustables ; maintenir les
  ajustements lors d’un changement de cible et bouton retour au calcul.
- [ ] Ajouter temps estimés modifiables et affichages recette/essai/archive.
- [ ] Enrichir Markdown, rejouer suite et parcours navigateur, commit.

## Tâche 3 — Disposition, compatibilité PWA et livraison

Fichiers : `index.html`, `sw.js`, `tests/sw.test.cjs`, documentation existante.

- [ ] Contrôler puis corriger disposition des titres/actions/navigation et champs,
  labels associés, verdicts français, boutons tactiles et notifications.
- [ ] Tester Chromium : référence 6 portions, essai 2, ajustement 110 g puis cible 3,
  retour au calcul, persistance, temps, ancien JSON et JSON enrichi ; captures hors Git.
- [ ] Rejouer ACCEPTANCE et tests SW ; incrémenter cache sans changer la clé des données.
- [ ] Faire une revue indépendante de la branche et corriger les problèmes importants.
- [ ] Mettre à jour données/documentation/bilan, pousser une PR puis intégrer et
  publier conformément à la demande validée ; vérifier URL et assets publics.

## Journal

- Exécution inline autorisée par la validation utilisateur ; la branche dédiée existe.
- Prévol : les interfaces sont partagées de 1 vers 2 ; aucune incohérence détectée.
