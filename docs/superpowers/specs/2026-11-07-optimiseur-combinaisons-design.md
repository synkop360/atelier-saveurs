# Optimisation des combinaisons culinaires — conception

Statut : conception validée par l’utilisateur le 7 novembre 2026.

## Intention et périmètre

Réduire les dégustations nécessaires pour explorer les variantes d’un assemblage,
avec une couverture vérifiable et sans perdre les données du plan. L’objectif
porte sur le nombre de dégustations, pas encore sur coûts, achats, temps, équipements
ou quantités consommées. Préparations, quantités et ajustements existants sont conservés.

Approches discutées et retenues :

- Couverture par paires, par défaut : chaque paire réalisable de variantes de deux
  composants est représentée. Cela ne couvre pas nécessairement les interactions
  entre trois éléments ou plus et ne garantit pas le meilleur résultat culinaire.
- Couverture complète : toutes les combinaisons réalisables sélectionnées.

L’utilisateur a accepté ces deux modes. Pour les petits problèmes, rechercher et
prouver un minimum quand le calcul l’établit ; sinon fournir une solution couvrante
avec la mention explicite « minimum non garanti ».

Conserver l’application native, la PWA, le stockage local et le schéma 1 par extensions
optionnelles. Aucun serveur d’IA, solveur distant ou migration automatique.

## Choix des facteurs et contraintes

Depuis un plan, action « Optimiser les dégustations » :

1. Choisir les composants et les variantes à explorer, toutes sélectionnées par défaut.
   Au moins un composant et une variante par composant retenu ; le plan et ses
   variantes ne sont pas amputés par ce filtrage de l’optimiseur.
2. Choisir par paires ou couverture complète.
3. Ajouter des exclusions : une règle sélectionne au moins deux variantes de
   composants distincts ; un assemblage est interdit s’il contient toutes ces
   sélections. Cela permet d’interdire une paire ou un assemblage plus précis.
   Pas d’expression ni de code à saisir/exécuter. Les règles portent sur les
   composants et variantes retenus ; un filtrage qui les rend incompatibles demande
   de corriger explicitement les règles, sans les supprimer automatiquement.
4. Choisir les lots utilisés et les dégustations à conserver, puis calculer un aperçu.

Une variante « absente » est une modalité explicite, sans préparation. « Non testé »
dans une dégustation partielle n’est pas assimilé à une variante absente. Une ligne
entièrement sans composant inclus est non réalisable et n’est pas générée.

L’univers est le produit cartésien des variantes retenues, filtré par les exclusions
et la règle ci-dessus. Le total théorique brut et le total réalisable sont distincts.
Les cibles par paires sont les paires présentes dans au moins une combinaison
réalisable complète ; les paires rendues impossibles par les exclusions ne gonflent
pas le dénominateur. Afficher les variantes sans aucune combinaison réalisable.
Si un seul composant est retenu, couvrir chacune de ses variantes réalisables et
nommer la mesure « variantes couvertes », sans afficher une couverture de paires vide.
Aucun assemblage réalisable : explication et application impossible, jamais « 100 % ».

Les lots dont les ingrédients restent à préciser (tuile par exemple) ne sont pas
exclus silencieusement : ils peuvent être planifiés et portent un avertissement.
Le contrôle existant bloque toujours leur réalisation tant qu’ils sont incomplets.

## Réutilisation des lots sans perte des quantités

Pour chaque variante incluse retenue :

- Un seul lot existant : le proposer en conservant son identifiant, son rendement,
  ses ajustements et son éventuel essai enregistré.
- Plusieurs lots existants : demander de choisir explicitement celui utilisé par les
  nouvelles lignes. Leurs quantités différentes ne sont pas fusionnées ni moyennées.
- Aucun lot existant : annoncer dans l’aperçu un nouveau lot basé sur la variante et
  son rendement cible. Le créer seulement lors de l’application.

Les dégustations conservées gardent leurs propres choix de lots, même si elles
utilisent un autre lot de la même variante. La couverture mesure des variantes,
pas toutes les quantités ou tous les lots possibles ; l’interface le rappelle.
Aucune quantité de lot n’est multipliée par son nombre d’utilisations. Les lots
existants inutilisés après réagencement restent conservés.

## Conservation et réagencement

Deux opérations explicites, indépendantes du mode de couverture :

- **Compléter le plan**, opération par défaut : conserver toutes les dégustations,
  ajouter seulement les lignes nécessaires pour la couverture demandée.
- **Réagencer les dégustations vierges** : conserver les lignes protégées/épinglées
  et proposer de remplacer les autres lignes vierges par une sélection réduite.

Une dégustation est remplaçable uniquement si son état est `planned`, sa date vide,
ses observations vides, toutes ses notes nulles et son verdict `pending`. Une ligne
réalisée, non réalisée (`skipped`), datée ou contenant une note/observation/verdict
est protégée automatiquement. L’utilisateur peut également épingler une ligne
vierge. Ne pas modifier les essais, les recettes, les composants ou les variantes.

L’aperçu liste nommément les lignes conservées, remplacées et ajoutées ainsi que les
nouveaux lots. L’application est un clic de validation explicite, avec téléchargement
préalable du JSON actuel si des lignes sont remplacées. Pas de suppression masquée,
pas d’application au chargement ni après un simple changement de mode.

Si une dégustation conservée contredit une nouvelle exclusion, elle reste intacte
et son conflit est signalé. Une ligne protégée conflictuelle n’est pas comptée
comme couverture de l’univers courant ; aucune ancienne évaluation n’est invalidée.

Un plan archivé peut être analysé, mais aucune proposition ne peut lui être appliquée ;
dupliquer le plan pour poursuivre. Annuler ou fermer l’aperçu ne sauvegarde rien.

## Couverture et historique

Calculer séparément :

- couverture **réalisée** : dégustations `completed`, selon leurs sélections réelles ;
- couverture **prévue** : union des lignes `planned` et `completed`, sans les `skipped` ;
- couverture après proposition, nombre de nouveaux lots et de nouvelles dégustations.

Une dégustation partielle ne couvre que les paires explicitement présentes. Elle
ne compte que si une combinaison réalisable prolonge ses sélections retenues. Elle ne
couvre pas une combinaison complète dont certains composants n’ont pas été testés.
Les répétitions d’une combinaison ne multiplient pas la couverture ; elles restent
visibles et conservées lorsqu’elles portent des résultats ou sont épinglées.
Les résultats numériques de dégustation ne déterminent pas la couverture.

Après édition manuelle du plan, recalculer les métriques au lieu de garder un badge
obsolète. Une preuve de minimum historique ne s’applique plus à un plan modifié.
L’optimiseur ne prétend pas sélectionner scientifiquement le meilleur dessert.

## Stratégie de calcul proposée par Codex

Énumérer intégralement les candidats pour les univers bruts jusqu’à 4 096 combinaisons.
Au-delà, demander de restreindre composants/variantes : pas d’échantillonnage présenté
comme une preuve de couverture complète. Afficher cette limite avant calcul.

En couverture par paires :

1. Déduire les cibles déjà couvertes par les lignes conservées compatibles.
2. Construire une solution gloutonne couvrant les cibles restantes, avec départages
   déterministes, amélioration par retrait de lignes redondantes et plusieurs ordres
   de départ bornés. Vérifier indépendamment la couverture du résultat.
3. Calculer des bornes inférieures : chaque ligne ne couvre qu’une paire donnée pour
   un couple de composants. Si la solution atteint une borne prouvée, le minimum
   du nombre de lignes ajoutées est démontré dans ce contexte.
4. Pour les petits problèmes (au plus 64 candidats et 256 cibles), compléter si
   nécessaire par recherche exacte bornée en nombre de nœuds et temps d’exécution.
   Si le parcours est interrompu avant preuve, conserver la meilleure solution
   couvrante et indiquer « minimum non garanti ».

Le nombre de dégustations ajoutées est l’objectif principal, sous les sélections,
contraintes et lignes conservées. Le nombre de nouveaux lots sert de départage,
jamais au prix d’une couverture moindre. La preuve ne vaut que pour ces contraintes
et ces lignes conservées, pas pour une optimisation mondiale de tout le carnet.

En couverture complète, générer exactement les combinaisons réalisables manquantes,
sans doublons ; seules les lignes `planned` ou `completed` déjà compatibles
représentent une combinaison, jamais une ligne `skipped`. Les lignes protégées/épinglées peuvent rester surnuméraires : le nombre
total affiché doit expliquer cette différence.

Le calcul doit laisser l’interface réactive, afficher son état et pouvoir être annulé.
Les budgets précis et le découpage asynchrone relèvent de l’implémentation ; leur
interruption ne doit jamais laisser une preuve de minimum ou un aperçu partiel
présenté comme couvrant. Toujours vérifier la couverture avant de proposer Appliquer.

## Cas dessert d’acceptation

Trois composants, deux variantes chacun, sans exclusion : 8 combinaisons théoriques
et réalisables, 12 paires distinctes. Une solution de 4 dégustations couvre les 12
paires ; la borne de 4 pour chaque couple de composants prouve le minimum.

- Le modèle actuel à 4 lignes est déjà couvrant ; Compléter n’ajoute rien.
- À partir des 8 lignes vierges exhaustives, Réagencer propose 4 lignes couvrantes,
  avec aperçu et sauvegarde avant remplacement.
- Le mode complet propose les 8 combinaisons si elles ne sont pas déjà représentées.
- Après réalisation de D1, sa couverture réalisée est 3/12 paires. Elle reste intacte
  lors de tout calcul ou réagencement.
- Interdire chocolat 72 % avec tuile : ces assemblages sont retirés des candidats,
  le dénominateur de paires est recalculé depuis l’univers faisable, et les conflits
  avec les anciennes lignes sont signalés sans les modifier.
- Modifier le chocolat d’un lot ou sa quantité ne transforme pas un lot existant en
  un autre lot ni ne déplace ses observations ; les liaisons restent explicites.

## Données, validation et exports

Réglages facultatifs dans le plan : mode, opération, composants/variantes retenus,
exclusions, choix de lots et lignes épinglées. Identifiants plutôt que noms.
L’absence de ces réglages dans une sauvegarde ancienne signifie le comportement
par défaut, sans écriture. Les références inconnues, exclusions malformées et modes
inconnus sont refusés avant toute écriture ; aucun `eval` ni expression dynamique.
Les réglages devenus incompatibles sont signalés ; ils ne sont pas effacés en silence.

Une proposition est transitoire et calculée sur une version précise du plan. Si le
plan ou ses réglages changent entre aperçu et application, bloquer et recalculer.
L’application travaille sur une copie, crée au besoin les lots, réutilise les liens
et enregistre en une seule transaction validée. Quota indisponible : brouillon et
aperçu conservés, aucune écriture partielle ni faux message de réussite.

Le JSON exporte les réglages et les données réellement appliquées. Le Markdown
explique le mode, les exclusions, la couverture prévue/réalisée, la matrice et les
limites. Une éventuelle preuve sauvegardée est datée et liée à son contexte ; elle
ne remplace jamais le calcul de couverture du plan courant. Dupliquer le plan
remappe les références de réglages, retire résultats et anciennes preuves.

## Vérification et livraison

Tests : oracle exhaustif indépendant sur petits univers, dessert 4/8 et 12 paires,
variantes absentes, un/deux composants, exclusions de paires et de triples, zéro
solution, lignes partielles, doublons/répétitions, résultats protégés, lots multiples
et ajustés, refus d’aperçu périmé, annulation, limite de taille, budgets de recherche,
transaction/quota, import/export et régressions existantes.

Chromium bureau/mobile : aperçu sans écriture, changement de mode, réagencement
avec sauvegarde, sélection explicite de lots, conflit d’exclusion, résultats et
quantités intacts, messages de minimum conditionnels, modification manuelle suivie
de métriques actualisées, persistance, hors ligne et mise à jour PWA.

Après validation : branche, plan d’implémentation, tests, revue indépendante, PR,
publication et vérification Pages réelle. Aucune prétention à un test Android
physique sans appareil. Coûts et ordonnancement de cuisine restent les étapes suivantes.
