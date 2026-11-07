# Optimiseur de combinaisons — plan d’implémentation

> Exécution en session avec `superpowers:executing-plans` ; revue indépendante finale.

**But :** couverture par paires et complète, exclusions, aperçu, conservation des résultats.
**Architecture :** monofichier natif/PWA ; réglages facultatifs de plan, sans migration.
**Spécification :** `docs/superpowers/specs/2026-11-07-optimiseur-combinaisons-design.md`, validée.

## Contraintes et revue

Ne jamais modifier essais, recettes, quantités ou évaluations existantes.
Lignes réalisées/annotées/datées/non réalisées protégées ; sauvegarde avant remplacement.
Couvertures prévue et réalisée distinctes ; absence explicite différente de non testé.
Prouver le minimum uniquement si établi ; limite d’univers brut de 4 096.
Calcul annulable, application atomique, refus d’un aperçu périmé.

## 1 — Univers et couverture

Fichiers : `index.html`, `tests/optimizer.test.cjs`.
Interfaces : `optimizationDefaults`, `validateOptimizationSettings`,
`buildOptimizationUniverse`, `optimizationCoverage`, `isPristineTasting`.

- [ ] Tests en échec : dessert 8 combinaisons/12 paires, contraintes, partiels,
  absences, un composant, aucun candidat, skipped, notes et doublons.
- [ ] Construire l’univers complet et les cibles réalisables, calculer les deux
  couvertures, valider les références et lier explicitement les lots multiples.
- [ ] Exécuter toute la suite Node ; commit.

## 2 — Solveur et propositions

Interfaces : générateur `solveOptimization`, wrapper de test `optimizePlan`,
`buildOptimizationProposal`, `applyOptimizationProposal`.

- [ ] Tests en échec avec oracle exhaustif indépendant : 4 lignes minimales sur
  dessert, couverture complète, complétion, réagencement, exclusions et budgets.
- [ ] Solution gloutonne multi-départ, nettoyage et bornes ; recherche exacte bornée
  pour ≤64 candidats/256 cibles. Vérifier la couverture avant toute proposition.
- [ ] Propositions sans écriture, lots créés uniquement à l’application, annotations
  conservées, refus d’état périmé et de plan archivé, mutation atomique sur copie.
- [ ] Tester imports/exports, duplication des réglages et échecs de stockage ; commit.

## 3 — Interface

- [ ] Parcours Chromium en échec avant branchement : modes, exclusions, lots,
  aperçu sans sauvegarde et remplacement avec sauvegarde.
- [ ] Écran de réglages, filtres et règles d’exclusion ; lots multiples à choisir.
- [ ] Calcul asynchrone annulable, aperçu conservées/remplacées/ajoutées et quantités.
- [ ] Couverture recalculée sur le plan courant, distinction des preuves, exports.
- [ ] Valider mobile/bureau, contraintes, résultats inchangés, annulation et persistance.

## 4 — Livraison

- [ ] Tests Node, oracle, anciens parcours et mise à jour PWA sans migration.
- [ ] Revue indépendante et correction des points importants avec régressions.
- [ ] Documentation et bilan, PR, intégration, Pages et parcours public vérifié.

## Journal

- Conception validée ; branche dédiée `feat/combination-optimizer` déjà créée.
- Exécution autonome autorisée ; interfaces univers→solveur→UI vérifiées.
- Limites de travail retenues : 12 composants sélectionnés, 128 exclusions,
  4 096 candidats bruts ; recherche exacte bornée en nœuds et temps. Ces limites
  sont affichées ; aucun sous-échantillon n’est annoncé comme couverture totale.
