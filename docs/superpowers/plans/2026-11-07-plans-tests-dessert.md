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

- [x] Écrire les tests en échec sur ancien JSON, liens invalides, copies et absence.
- [x] Ajouter schéma optionnel, fonctions de construction, validation complète et
  duplication sans résultats/liens, sans modifier les données existantes.
- [x] Ajouter modèle dessert depuis sources explicites : recettes élémentaires
  nouvelles, variantes chocolat/sucre, cinq préparations et quatre assemblages.
- [x] Vérifier les valeurs 75/72 %, 15/22,5 g, références et source composée intactes.
- [x] Exécuter toute la suite Node et commiter.

## Tâche 2 — Réalisation et exports

Fichiers : `index.html`, tests de provenance, transaction et verrouillage.
Interfaces : `beginPlanPreparation`, `commitTrial`, `assertPreparationReady`,
`assertTrialDeletable`, `planReport` ; extensions optionnelles `trial.planContext`.

- [x] Tester en échec le lien atomique plan/essai, annulation sans écriture,
  instantanés, tuile incomplète bloquée, réalisation avec préparations manquantes,
  notes inconnues et suppression d’un essai lié.
- [x] Relier le formulaire existant aux références figées ; l’enregistrement seul
  lie un essai au plan, sans reconstruire depuis la recette courante.
- [x] Ajouter suivi des dégustations, duplication/répétitions, archivage et
  verrouillage des éléments déjà utilisés ; export Markdown et JSON.
- [x] Exécuter toute la suite Node, vérifier quota et références puis commiter.

## Tâche 3 — Écrans et modèle dessert

Fichiers : `index.html`, script Playwright temporaire hors Git.

- [x] Écrire un parcours navigateur en échec avant de brancher les écrans.
- [x] Ajouter liste des plans, création générique et aperçu dessert avec sources
  choisies ; création transactionnelle après sauvegarde JSON.
- [x] Ajouter édition des variantes (ingrédients effectifs, quantités, consignes),
  lots et références rechargeables explicitement avant démarrage.
- [x] Ajouter dégustations modifiables, résultats séparés et comparaison sans moyenne.
- [x] Vérifier ajout/retrait sans perte de saisie, aucune suppression en cascade,
  anciens parcours, dispositions 360/390/844/1280, captures et erreurs navigateur.

## Tâche 4 — Vérification et livraison

- [x] Incrémenter le cache PWA, vérifier hors ligne et actualisation sans réécriture.
- [x] Faire une revue indépendante de l’ensemble et corriger les problèmes importants.
- [x] Mettre à jour README, modèle, roadmap et bilan exact ; créer une PR,
  intégrer puis vérifier Pages HTTP/identité des assets et parcours public.

## Journal

- Conception approuvée : exécution et publication autonomes déjà autorisées.
- Branche `feat/test-plans-dessert` existante ; aucun changement utilisateur local.
- Interfaces : domaine→réalisation→UI ; sauvegarde transactionnelle commune `save`.

- Domaine, réalisation et UI terminés : `fa34a1a`, `1ef1a41` ; tests RED→GREEN.
- Revue indépendante : procédure de cuisson mal découpée ; corrigée dans `fdcbdc7`
  avec régressions explicites et aperçu des nouvelles procédures. Les procédures
  personnalisées requièrent un plan libre, afin de ne pas interpréter leurs étapes.
- Dernières vérifications : 50 tests Node, parcours dessert complet et plan générique,
  anciens parcours, stockage hors ligne et mise à jour PWA réussis en local.
- Choix : ingrédients qualitatifs possibles seulement avec indication explicite
  « au goût » ; aucune formule de tuile inventée ; quantités réelles synchronisées
  au lot lors de l’enregistrement de l’essai ; coûts/optimiseur général reportés.

- Livraison : PR n°3 intégrée dans `5037438`, Pages réussi, quatre assets HTTP 200
  identiques à l’arbre local. Parcours complet public réussi et suite intégrée 50/50.
- Les coûts et l’optimisation générale restent les prochaines étapes de la roadmap ;
  aucun résultat Android physique ou audio n’a été revendiqué.
