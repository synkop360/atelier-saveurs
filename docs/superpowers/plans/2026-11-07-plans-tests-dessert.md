# Plans de test culinaires — plan d’implémentation

> Exécution en session avec `superpowers:executing-plans`, revue indépendante finale.

**But :** plans génériques et modèle dessert : 5 préparations, 4 dégustations.
**Architecture :** conserver monofichier natif, localStorage schema 1, `testPlans` optionnel.
**Spécification :** `docs/superpowers/specs/2026-11-07-plans-tests-dessert-design.md`, validée.
**Technologies :** HTML/CSS/JS, Node test, Chromium/Playwright sans dépendance applicative.

## Contraintes et points de revue

Aucune migration silencieuse ; références et résultats historiques indépendants.
Aucune formule de tuile inventée ; sauvegarde avant création des nouvelles recettes.
Un lot peut servir à plusieurs dégustations ; pas d’essai fantôme lors d’une annulation.
Notes inconnues distinctes de zéro ; suppression liée bloquée ; erreurs de quota atomiques.
Respect des sources sélectionnées, saisie mobile et export/import complet.

## Tâche 1 — Domaine et schéma

Fichiers : `index.html`, `tests/plans.test.cjs`.
Interfaces : `createPlan`, `addPlanComponent`, `materializeVariant`,
`addPreparation`, `addTasting`, `validateTestPlans`, `duplicatePlan`.

- [ ] Écrire les tests en échec sur ancien JSON, liens invalides, copies et absence.
- [ ] Ajouter schéma optionnel, fonctions de construction, validation complète et
  duplication sans résultats/liens, sans modifier les données existantes.
- [ ] Ajouter modèle dessert depuis sources explicites : recettes élémentaires
  nouvelles, variantes chocolat/sucre, cinq préparations et quatre assemblages.
- [ ] Vérifier les valeurs 75/72 %, 15/22,5 g, références et source composée intactes.
- [ ] Exécuter toute la suite Node et commiter.

## Tâche 2 — Réalisation et exports

Fichiers : `index.html`, tests de provenance, transaction et verrouillage.
Interfaces : `beginPlanPreparation`, `commitTrial`, `assertPreparationReady`,
`assertTrialDeletable`, `planReport` ; extensions optionnelles `trial.planContext`.

- [ ] Tester en échec le lien atomique plan/essai, annulation sans écriture,
  instantanés, tuile incomplète bloquée, réalisation avec préparations manquantes,
  notes inconnues et suppression d’un essai lié.
- [ ] Relier le formulaire existant aux références figées ; l’enregistrement seul
  lie un essai au plan, sans reconstruire depuis la recette courante.
- [ ] Ajouter suivi des dégustations, duplication/répétitions, archivage et
  verrouillage des éléments déjà utilisés ; export Markdown et JSON.
- [ ] Exécuter toute la suite Node, vérifier quota et références puis commiter.

## Tâche 3 — Écrans et modèle dessert

Fichiers : `index.html`, script Playwright temporaire hors Git.

- [ ] Écrire un parcours navigateur en échec avant de brancher les écrans.
- [ ] Ajouter liste des plans, création générique et aperçu dessert avec sources
  choisies ; création transactionnelle après sauvegarde JSON.
- [ ] Ajouter édition des variantes (ingrédients effectifs, quantités, consignes),
  lots et références rechargeables explicitement avant démarrage.
- [ ] Ajouter dégustations modifiables, résultats séparés et comparaison sans moyenne.
- [ ] Vérifier ajout/retrait sans perte de saisie, aucune suppression en cascade,
  anciens parcours, dispositions 360/390/844/1280, captures et erreurs navigateur.

## Tâche 4 — Vérification et livraison

- [ ] Incrémenter le cache PWA, vérifier hors ligne et actualisation sans réécriture.
- [ ] Faire une revue indépendante de l’ensemble et corriger les problèmes importants.
- [ ] Mettre à jour README, modèle, roadmap et bilan exact ; créer une PR,
  intégrer puis vérifier Pages HTTP/identité des assets et parcours public.

## Journal

- Conception approuvée : exécution et publication autonomes déjà autorisées.
- Branche `feat/test-plans-dessert` existante ; aucun changement utilisateur local.
- Interfaces : domaine→réalisation→UI ; sauvegarde transactionnelle commune `save`.
