# Publication et fiabilisation du MVP

**Objectif :** exécuter CODEX_TASK.md dans l'ordre P0, P1, P2.
**Architecture :** HTML/CSS/JS natifs monofichier, localStorage schema 1, PWA sans build.
**Spécification :** CODEX_TASK.md et docs/ACCEPTANCE.md.

## Contraintes
Préserver les fichiers distants, la licence MIT et les données locales. Aucune migration, refonte ou synchronisation. Ne pas prétendre à un test Android réel.

## Points de vérification
Stockage refusé ou corrompu ; import malformé ; indépendance des instantanés ; cache obsolète ; viewport mobile et repli clavier.

## Tâches
- [x] P0 : importer les fichiers en fusionnant le README existant ; contrôler le diff et commiter. Activer Pages main/racine ; vérifier HTTP et assets.
- [x] P1 : exercer les parcours ACCEPTANCE avec Chromium, dont création projet/recette/V1/V2, sauvegardes et rechargement ; reproduire les défauts avant correction.
- [x] P2 : ajouter les tests de non-régression ciblés ; corriger stockage/import et stratégie SW sans changer le schéma ; rejouer les parcours, commiter et publier.
- [x] Livraison : vérifier le site final, documenter les résultats exacts et limites et fournir les commits.

Exécution autonome en session conformément à la demande utilisateur.


## Journal de réalisation

- P0 : import `70a6651`, README fusionné et historique distant préservé.
  Refus HTTP 403 initial, puis publication après ajustement de l’accès ; Pages
  activé par l’utilisateur depuis Settings. Publication réelle vérifiée.
- P1/P2 : corrections isolées `4d93369`, `e71c6e7`, `14c793a`, `ebf903a`.
- Revue indépendante : éditions invalides identifiées et corrigées dans `3b682a9`.
- Vérifications : 11 tests Node réussis, acceptation Playwright locale et publique,
  mise à jour SW v1 vers v3 sur serveur contrôlé et persistance hors ligne.
- Décisions : architecture native et schéma 1 conservés ; stockage illisible
  protégé, récupération via export brut et profil séparé documentée. Pas de
  réinitialisation automatique. Android réel et audio restent non testés.
