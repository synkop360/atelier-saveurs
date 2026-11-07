# Mission Codex — déployer et fiabiliser Atelier Saveurs

## Contexte
L'utilisateur souhaite un carnet culinaire **généraliste**, réutilisable après Noël 2026, permettant de consulter et modifier des recettes, réaliser des essais reproductibles, noter les résultats, dicter des observations, comparer des versions et exporter les données. Le MVP v0.1 a été généré et emballé ici ; il n'a pas été publié sur GitHub car l'intégration précédente n'avait pas la permission d'écriture (403). L'utilisateur souhaite confier la suite à Codex, avec accès au dépôt.

## Dépôt et publication
- Dépôt : https://github.com/synkop360/atelier-saveurs
- Branche cible : `main`
- GitHub Pages souhaité : https://synkop360.github.io/atelier-saveurs/
- Publication : GitHub Pages depuis `main` / racine, ou GitHub Actions si nécessaire ; privilégier la voie la plus simple et fiable.
- Ne pas supposer que GitHub Pages est déjà activé. Vérifier réellement le déploiement et le HTTP 200 du site, si accès réseau disponible.

## Tâches ordonnées
### P0 — Dépôt et première publication
1. Inspecter l'état distant et éviter d'écraser un README ou des fichiers modifiés entre-temps.
2. Importer `index.html`, `manifest.webmanifest`, `sw.js`, `icon.svg`, `.nojekyll`, `.gitignore`, `LICENSE`, et fusionner `README.md` si nécessaire.
3. Garder `AGENTS.md`, `CODEX_TASK.md` et `docs/` dans le dépôt comme documentation de maintenance.
4. Activer/configurer GitHub Pages si l'environnement Codex a les droits ; sinon donner le chemin exact à suivre dans Settings > Pages.
5. Vérifier l'URL finale, le chargement des assets, le manifest et le service worker.

### P1 — Recette complète de test
1. Tester le chargement initial : 7 fiches de Noël visibles.
2. Créer un projet et une recette générale, puis un essai V1 et V2.
3. Saisir paramètres et notes ; vérifier la persistance après rafraîchissement.
4. Tester export JSON, import JSON et export Markdown ; vérifier l'intégrité et les erreurs d'import.
5. Tester l'ergonomie mobile (viewport ~390x844) et les contrôles tactiles.
6. Tester la reconnaissance vocale si navigateur/appareil compatibles ; sinon vérifier que le repli clavier reste utilisable.
7. Corriger les bugs bloquants en commits isolés ; ne pas inventer des résultats de tests Android.

### P2 — Fiabilisation à portée limitée
- Éviter qu'une mise à jour du service worker laisse un ancien `index.html` en cache ; définir une stratégie explicite et versionner le cache.
- Ajouter un minimum de tests automatisés pertinents si cela ne nécessite pas de refonte complète.
- Améliorer la gestion des erreurs de stockage local et d'import ; ne jamais perdre silencieusement des données.
- Prévoir, sans l'implémenter par défaut, un futur schéma de données migrable et un stockage IndexedDB.

## Hors périmètre immédiat
Migration React/TypeScript, backend, authentification, synchronisation cloud, intégration directe API ChatGPT, paiement, Google Play, gestion des stocks et calculs nutritionnels. La licence MIT autorise une exploitation commerciale et une distribution Google Play, sous réserve des règles Google et des licences tierces ; une publication Play n'est pas demandée ici.

## Livraison attendue
- URL du dépôt, commit ou PR et URL Pages **testée**.
- Résumé des fichiers publiés et des corrections.
- Checklist de validation avec résultats « réussi / échoué / non testé ».
- Limites restantes et prochaine étape recommandée.
