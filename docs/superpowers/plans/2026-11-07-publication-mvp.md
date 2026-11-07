# Publication et fiabilisation du MVP

**Objectif :** exécuter CODEX_TASK.md dans l'ordre P0, P1, P2.
**Architecture :** HTML/CSS/JS natifs monofichier, localStorage schema 1, PWA sans build.
**Spécification :** CODEX_TASK.md et docs/ACCEPTANCE.md.

## Contraintes
Préserver les fichiers distants, la licence MIT et les données locales. Aucune migration, refonte ou synchronisation. Ne pas prétendre à un test Android réel.

## Points de vérification
Stockage refusé ou corrompu ; import malformé ; indépendance des instantanés ; cache obsolète ; viewport mobile et repli clavier.

## Tâches
- [ ] P0 : importer les fichiers en fusionnant le README existant ; contrôler le diff et commiter. Activer Pages main/racine ; vérifier HTTP et assets.
- [ ] P1 : exercer les parcours ACCEPTANCE avec Chromium, dont création projet/recette/V1/V2, sauvegardes et rechargement ; reproduire les défauts avant correction.
- [ ] P2 : ajouter les tests de non-régression ciblés ; corriger stockage/import et stratégie SW sans changer le schéma ; rejouer les parcours, commiter et publier.
- [ ] Livraison : vérifier le site final, documenter les résultats exacts et limites et fournir les commits.

Exécution autonome en session conformément à la demande utilisateur.
