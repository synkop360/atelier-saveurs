# Critères d'acceptation

Cocher uniquement après vérification réelle. Indiquer le navigateur et l'appareil utilisés.

- [x] `main` contient l'application et les métadonnées (README, licence MIT, gitignore).
- [x] GitHub Pages est actif et l'URL retourne le site attendu.
- [x] Aucun asset n'est en 404, manifest chargé, pas d'erreur JS bloquante.
- [x] Les sept fiches de Noël apparaissent à la première visite.
- [x] Création d'un projet et d'une recette hors Noël.
- [x] Création de deux essais V1/V2 distincts et consultation de l'historique.
- [x] Les observations et notes restent après rafraîchissement.
- [x] Export JSON, réimport du fichier et export Markdown vérifiés.
- [x] Import invalide géré sans destruction des données existantes.
- [x] Interface utilisable sur écran Android ou émulation mobile.
- [x] Dictée testée sur navigateur compatible, OU limite clairement documentée.
- [x] Site utilisable hors ligne après premier chargement (dans les limites annoncées).
- [x] Mise à jour du site testée sans blocage par l'ancien cache.
- [x] Aucune donnée personnelle ni clé API commitées.

## À signaler explicitement
- Test Android réel vs émulation ; HTTPS et permissions micro.
- Sauvegarde uniquement locale : pas de synchronisation.
- Fonctionnalités non encore implémentées et risques connus.


## Résultats vérifiés — 7 novembre 2026

Version applicative : `3b682a9` ; publication GitHub Pages depuis `main` / racine.
URL : https://synkop360.github.io/atelier-saveurs/.

Environnement : Chromium 156.0.8078.79 via Playwright (plugin Browser absent),
Linux, bureau 1280×900 et viewport mobile 390×844 ; contrôle public supplémentaire
avec émulation tactile/mobile. Node.js 24.22.1 pour les tests de non-régression.

| Vérification | Résultat et preuve |
| --- | --- |
| Dépôt et publication | Réussi : historique initial et titre du README conservés ; commits poussés ; build Pages terminé. |
| HTTP et assets | Réussi : index, manifest, SW et icône HTTP 200, contenus identiques aux fichiers locaux du commit applicatif. |
| Démarrage | Réussi : titre attendu, sept recettes, contenu visible et aucune erreur JS. |
| Projet / recette hors Noël | Réussi : création « Cuisine quotidienne » et « Soupe de courge » par l’interface. |
| V1 / V2 et historique | Réussi : deux essais distincts, mesures, observations, notes et historique consultables. |
| Persistance | Réussi : données conservées après rechargement ; instantanés des essais inchangés après modification de la recette. |
| Exports / import | Réussi : fichier JSON téléchargé puis réimporté, égalité complète des données ; Markdown contenant les observations V1/V2. |
| Import invalide | Réussi : JSON syntaxiquement invalide et structure interne incorrecte rejetés, données existantes inchangées. |
| Mobile | Réussi en émulation : 390×844, aucun débordement horizontal de la page, saisie et navigation possibles. Android réel : non testé. |
| Dictée | Audio et permissions micro : non testés. Repli API absente : bouton donnant le focus au textarea et saisie clavier vérifiés. Micro du clavier Android : non testé. |
| Hors ligne | Réussi en local et sur Pages après chargement et activation du SW : rechargement avec réseau désactivé, données préservées. |
| Mise à jour du cache | Réussi sur serveur local contrôlé : SW initial v1 vers v3, nouvel HTML affiché, données localStorage inchangées, caches d’autres applications préservés. Actualisation ultérieure du HTML sans nouvelle version du SW vérifiée, puis rechargement hors ligne. |
| Stockage défaillant | Réussi : accès refusé sans crash ; contenu corrompu non écrasé et alerte persistante ; erreur d’écriture sans faux succès et éditeur conservé. |
| Validation des éditions | Réussi : date d’essai vide et recette sans projet refusées avant écriture ; ces cas ne peuvent plus produire une sauvegarde rejetée au prochain chargement. |
| Tests automatiques | Réussi : 11 tests Node, zéro échec. Commande : `node --test --test-isolation=none tests/*.test.cjs`. |
| Données privées / secrets | Aucun ajouté : données de test uniquement dans les profils temporaires du navigateur ; sauvegardes et captures hors dépôt. |

Les parcours d’acceptation complets ont été exécutés sur le serveur local puis
sur l’URL publique. Les tests Node sont conservés dans `tests/` ; les scripts
Playwright et captures de cette session sont des preuves temporaires hors dépôt.
Une revue indépendante a identifié les deux cas de validation d’édition ci-dessus ;
ils ont été reproduits par des tests en échec, corrigés puis vérifiés.

### Limites et récupération

- Données uniquement locales, sans synchronisation ni garantie de conservation si
  le navigateur est vidé ; sauvegarder régulièrement en JSON.
- Si les données existantes sont illisibles, aucune réinitialisation ni migration
  n’est lancée. Le bouton « Exporter les données brutes » conserve les octets pour
  diagnostic. Le navigateur reste protégé contre toute écriture, y compris l’import.
  Pour utiliser une sauvegarde JSON valide sans toucher aux données endommagées,
  ouvrir l’application dans un autre profil de navigateur et y importer cette
  sauvegarde. Toute réparation ou suppression dans le profil d’origine doit être
  précédée de la sauvegarde brute et d’un accord explicite.
- Un quota plein ne permet pas d’enregistrer : conserver l’éditeur ouvert, libérer
  de l’espace puis réessayer. Un brouillon non enregistré n’est pas garanti après
  fermeture ou rechargement.
- La reconnaissance vocale dépend du navigateur, de ses permissions et d’éventuels
  services tiers. Validation Android réelle et audio recommandée ensuite.
- IndexedDB et migrations restent des pistes documentées dans `DATA_MODEL.md`,
  sans changement du schéma `schema: 1` ou de la clé localStorage existante.


## Version 0.2 — quantités, essais réduits, durées et disposition

Validation locale du 7 novembre 2026 : Chromium 156.0.8078.79 via Playwright
(plugin Browser absent), desktop 1280×900 et largeurs 360, 390, 844 et 1280 px.
Android physique et dictée audio restent non testés.

| Vérification | Résultat |
| --- | --- |
| Suite Node | Réussi : 25 tests, zéro échec, dont limites numériques, compatibilité et protection du stockage. |
| Anciennes données | Réussi : aucune réécriture au rechargement, import ancien JSON, texte original conservé. |
| Recette structurée | Réussi : rendement de référence, ajout/retrait de lignes sans perdre les autres saisies ; erreurs près des champs. |
| Essai réduit | Réussi : 6 portions et 300 g deviennent 2 portions et 100 g. |
| Ajustements | Réussi : 110 g reste fixe au changement de cible ; retour au calcul = 150 g pour 3 portions. |
| Valeurs incorrectes | Réussi : rendement zéro, unités de cible incompatibles et ajustement invalide bloquent l’écriture. |
| Instantanés | Réussi : modifier ensuite la référence ne change ni les ingrédients ni les durées de l’essai archivé. |
| Durées | Réussi : préparation/cuisson/repos/total, modification dans l’essai distincte de la référence, inconnue différente de zéro. |
| Sauvegardes | Réussi : ancien import puis JSON enrichi, égalité des données après aller-retour ; Markdown avec quantités effectives, ajustements, durées et verdict français. |
| Disposition | Réussi : contrôles dans les limites de l’écran, labels associés, navigation mobile entière et zones tactiles de 44 px. Captures inspectées. |
| Régression MVP | Réussi : tous les parcours automatisés de la première publication rejoués. |
| Cache et hors ligne | Réussi : mise à jour contrôlée SW v3→v4, données inchangées et caches étrangers conservés ; nouveau shell disponible hors ligne. |
| Revue indépendante | Réussi : aucune anomalie importante restante sur le commit applicatif `86af88a`, suite 25/25 confirmée. |

Deux régressions spécifiques ont des tests permanents : annuler une saisie manuelle
invalide avec « Revenir au calcul » ; refuser une quantité numérique pour une ligne
qualitative sans unité. Les scripts et captures navigateur restent hors Git.

Les anciennes listes d’ingrédients ne sont pas transformées automatiquement.
Pour bénéficier des quantités, ouvrir la recette, activer la saisie structurée,
saisir son rendement et ses lignes puis enregistrer. Les recettes de Noël restent
inchangées tant que l’utilisateur ne les modifie pas.


Publication 0.2 confirmée : [PR n°1](https://github.com/synkop360/atelier-saveurs/pull/1)
intégrée dans `bed676e`, déploiement Pages réussi. Les quatre fichiers applicatifs
(index, manifest, SW et icône) répondent HTTP 200 et sont identiques aux fichiers
du commit livré. Le parcours Chromium enrichi complet a ensuite réussi sur
https://synkop360.github.io/atelier-saveurs/ : création structurée, ajustements,
durées, instantanés, ancien/nouveau JSON, Markdown, dispositions aux quatre largeurs,
absence d’erreurs JS/assets et rechargement hors ligne avec les données conservées.
