# Instructions pour Codex — Atelier Saveurs

## Mission
Maintenir et faire évoluer **Atelier Saveurs**, carnet culinaire généraliste en français. Le premier projet de démonstration est « Noël 2026 » (7 fiches). Dépôt cible : `synkop360/atelier-saveurs`. Site attendu : `https://synkop360.github.io/atelier-saveurs/`.

## Priorité immédiate
Lire `CODEX_TASK.md`, puis publier le MVP existant, vérifier le site, corriger les défauts bloquants. Ne pas démarrer une réécriture React/TypeScript sans justification ni accord.

## Contraintes non négociables
- Ne jamais effacer, réinitialiser ou migrer silencieusement les données enregistrées chez l'utilisateur.
- Les données culinaires restent locales par défaut ; aucun envoi vers un serveur, service d'IA ou GitHub sans consentement explicite.
- Maintenir l'export/import JSON et un moyen de sauvegarder avant tout changement de schéma.
- L'interface reste utilisable sur Android, au tactile, et en français.
- La dictée vocale doit avoir un repli fonctionnel (clavier Android) si Web Speech API est indisponible.
- Préserver la distinction entre recette de référence et essai/version ; ne pas remplacer une recette validée par un essai.
- Les fiches de Noël sont des données de départ modifiables, pas des règles métier codées en dur.
- Ne pas prétendre qu'une fonctionnalité est testée si aucun test réel n'a été effectué.
- Aucun secret, jeton, donnée privée ou sauvegarde utilisateur dans Git.
- Licence MIT existante à conserver, copyright `synkop360`.

## État technique vérifié à la passation
- Application monofichier `index.html` (HTML/CSS/JS natif), sans build npm.
- PWA : `manifest.webmanifest`, `sw.js`, `icon.svg`.
- Stockage actuel : `localStorage`, **pas IndexedDB**.
- Service worker : stratégie cache-first simple, version `atelier-saveurs-v1` ; attention à la mise à jour du cache.
- Les sept recettes d'essais sont préchargées.
- `README.md`, `.gitignore`, `.nojekyll`, `LICENSE` sont fournis.
- La connexion GitHub ChatGPT pouvait lire le dépôt mais a reçu HTTP 403 `Resource not accessible by integration` en écriture. Codex devra utiliser sa propre autorisation GitHub et confirmer la publication.

## Méthode
1. Inspecter le dépôt distant, la branche `main`, ses fichiers et permissions avant de pousser.
2. Comparer les fichiers distants et ceux de ce dossier ; préserver toute modification distante.
3. Déployer par commits ciblés, idéalement une branche et une PR si le dépôt contient déjà du travail non trivial.
4. Tester les parcours principaux ; fournir résultats et limites, notamment Android et dictée vocale.
5. Signaler les choix qui demandent un arbitrage (données, confidentialité, architecture, licence).

## Critères de fin
Voir `CODEX_TASK.md` et `docs/ACCEPTANCE.md`. Donner les URLs réelles du dépôt, du commit/PR et du site après vérification, sinon indiquer précisément le blocage.
