# atelier-saveurs


Carnet culinaire généraliste, utilisable sur mobile et ordinateur, pour documenter les recettes et améliorer les préparations au fil d'essais comparables.

**Version :** 0.3 — plans de test, préparations partagées et dégustations comparées. Le projet « Noël 2026 » et sept fiches d'essais sont inclus.

## Fonctionnalités

- Gestion des projets et recettes : création, modification et duplication
- Fiches techniques avec ingrédients, étapes et objectifs
- Journal d'essais versionnés, mesures, observations, notes et verdicts
- Historique et comparaison des essais
- Dictée vocale lorsque l'API de reconnaissance vocale est prise en charge ; sinon microphone du clavier mobile
- Export et import JSON ; export Markdown pour partager un compte rendu
- Interface responsive et PWA avec cache hors ligne

## Essayer l'application

**GitHub Pages** (publication vérifiée le 7 novembre 2026) : https://synkop360.github.io/atelier-saveurs/

Pour exécuter localement :

```bash
python -m http.server 8000
```

Ouvrir http://localhost:8000 dans le navigateur. Aucun `npm install` ni build n'est nécessaire : la version MVP est réalisée en HTML, CSS et JavaScript natifs.

## Déploiement GitHub Pages

1. Dans le dépôt GitHub, ouvrir **Settings → Pages**.
2. Dans **Build and deployment**, sélectionner **Deploy from a branch**.
3. Choisir **main**, puis **/(root)** et enregistrer.
4. Attendre la fin du déploiement et ouvrir l'URL ci-dessus.

Les fichiers `index.html`, `manifest.webmanifest`, `sw.js` et `icon.svg` doivent se trouver à la racine de la branche `main`.

## Données personnelles et sauvegardes

Les données sont enregistrées **localement dans `localStorage` du navigateur**, et non dans GitHub. Elles ne sont pas synchronisées entre appareils. Utiliser régulièrement **Sauvegardes → Export JSON** : suppression des données du navigateur, navigation privée ou changement d'appareil peuvent entraîner leur perte. Éviter d'enregistrer des données sensibles dans ce prototype.

La reconnaissance vocale peut nécessiter une connexion et, selon le navigateur, faire appel à un service tiers. L'application ne conserve pas les fichiers audio.

## Structure

```text
index.html            # Application complète (MVP sans build)
manifest.webmanifest  # Métadonnées de l'application installable
sw.js                 # Cache hors ligne
icon.svg              # Icône
LICENSE               # Licence MIT
.gitignore            # Exclusions Git
.nojekyll             # Désactive le traitement Jekyll de GitHub Pages
```

## Évolutions envisagées

- Tests ergonomiques Android et amélioration de la dictée
- Synchronisation optionnelle et stockage plus robuste (IndexedDB)
- Comparaison graphique des essais et suivi des variables
- Export PDF et intégration à un packaging Android (par exemple via Capacitor)

## Licence

Distribué sous licence **MIT** — voir [LICENSE](LICENSE). Utilisation, modification et commercialisation autorisées sous réserve du maintien de l'avis de copyright et de licence. Les dépendances ou services tiers éventuellement ajoutés auront leurs propres conditions.


## Vérifications et maintenance

Résultats détaillés et limites : [docs/ACCEPTANCE.md](docs/ACCEPTANCE.md).
Tests sans dépendance npm (Node.js 24) :

```bash
node --test tests/*.test.cjs
```

Dans un environnement restreint ne permettant pas la création de sous-processus,
ajouter `--test-isolation=none` après `--test`.

Le service worker utilise le réseau en priorité pour actualiser l’application et
revient au cache hors ligne. Incrémenter sa version de cache lors d’un changement
du shell ; cette version est indépendante de la clé localStorage des données.
Aucune migration n’est effectuée. Une donnée illisible déclenche un mode protégé
avec export brut ; voir la procédure de récupération dans les critères d’acceptation.


## Quantités et temps estimés

Dans l’éditeur de recette, activer les quantités paramétriques, renseigner le
rendement de référence (par exemple 6 portions) et les ingrédients structurés.
La liste libre d’origine reste conservée : elle n’est pas convertie automatiquement.
Exporter une sauvegarde JSON avant de compléter des recettes existantes.

Dans un nouvel essai, choisir le rendement cible : 2 portions recalculent les
quantités à un tiers. Chaque quantité peut être ajustée manuellement ; cet ajustement
reste fixe quand la cible change, jusqu’à « Revenir au calcul ». Les quantités et
la référence utilisée restent archivées indépendamment des futures modifications.
Les conversions sont limitées aux unités compatibles, sans supposer une densité.

Les durées estimées de préparation, cuisson, repos et total sont facultatives.
Elles ne sont pas multipliées par le coefficient de quantité ; le total peut tenir
compte de tâches simultanées. Les essais ont leurs propres estimations.

Perspectives : [plans de test, optimisation des combinaisons, coûts et améliorations](docs/ROADMAP.md).


### Recettes déjà enregistrées et ingrédients des essais

Les sept recettes de départ sont maintenant fournies avec des ingrédients
paramétriques. Lorsqu’un rendement n’est pas connu, **1 lot** représente les quantités
originales ; croquettes et endives utilisent les 6 pièces indiquées dans leurs étapes.
Les fourchettes utilisent leur borne basse pour le calcul, avec une note explicite
et la plage d’origine conservée. Les quantités inconnues restent à préciser.

Pour vos recettes déjà enregistrées : sur l’accueil, choisir **Convertir les recettes
existantes**, vérifier l’aperçu puis **Sauvegarder et convertir**. Une sauvegarde JSON
est téléchargée avant l’application. Les textes, notes, identifiants, étapes et essais
archivés sont conservés ; les recettes déjà paramétriques restent inchangées.
Les listes personnalisées simples sont reconnues ; les lignes ambiguës restent
entières et non chiffrées pour être complétées manuellement. Rien n’est converti au
chargement sans votre action.

Les ingrédients sont visibles dans les nouveaux essais et dans les archives même
si la fiche utilise encore une liste libre. Une archive montre sa propre liste,
sans la remplacer par la version actuelle de la recette.


## Plans de test culinaires

Dans **Plans de test**, créer un plan libre ou **Créer le plan dessert**. Un plan
conserve ses recettes de référence, ses variantes, les lots à préparer et les
assemblages à déguster. Les notes de chaque préparation restent distinctes des
notes du dessert complet. Un même lot utilisé dans plusieurs dégustations correspond
à un seul essai du carnet.

Le modèle dessert propose chocolat 75/72 %, griottes sucrées à 10/15 % du poids des
fruits et présence/absence de tuile : cinq préparations, quatre dégustations, sur
huit combinaisons possibles. Il ne s’agit pas encore d’un optimiseur général.

Avant création, choisir les sources, examiner les deux nouvelles fiches élémentaires
et leurs procédures, puis télécharger la sauvegarde JSON proposée. La fiche composée
originale reste intacte. Le découpage automatique de la procédure griottes/tuile est
limité à la procédure connue du modèle ; une procédure personnelle utilise un plan
libre. La formule exacte de la tuile n’existant pas dans les données de départ,
son essai reste bloqué tant que ses ingrédients ne sont pas complétés dans la
variante ou dans une référence explicitement actualisée.

- **Préparer un lot** crée sa prévision ; **Démarrer cette préparation** ouvre
  l’essai. Annuler ne crée rien ; enregistrer lie le lot et l’essai en une écriture.
- Adapter la quantité du lot ou de l’essai sans modifier les recettes sources.
  La quantité réellement enregistrée reste celle de la préparation réalisée.
- **Composition et évaluation** permet de sélectionner les lots, enregistrer les
  conditions et noter l’assemblage. Une dégustation réalisée exige les essais de
  ses préparations. Une note vide reste « Non évalué ».
- **Comparer** affiche les critères et observations sans moyenne imposée. Le tableau
  peut défiler horizontalement. Amertume et acidité sont notées selon l’équilibre
  souhaité, pas l’intensité brute.
- Un nouveau lot de variante repart des paramètres de cette variante ; les
  ajustements manuels d’un essai précédent ne sont pas recopiés implicitement.
- Une nouvelle dégustation similaire réutilise ses lots sélectionnés ; choisir de
  nouveaux lots pour une confirmation indépendante.
- Les éléments utilisés sont protégés. Un essai lié ne peut pas être supprimé.
  Dupliquer un plan crée de nouveaux identifiants et retire résultats/liens d’essais.
  L’archivage conserve le plan en consultation.

Les plans sont inclus dans le JSON global et le Markdown. Chaque plan peut aussi
être exporté seul en Markdown. Les anciens fichiers restent importables ; aucun
plan n’est ajouté au chargement des données existantes.
