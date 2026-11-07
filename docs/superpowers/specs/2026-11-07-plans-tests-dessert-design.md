# Plans de test culinaires — première version et cas dessert

Statut : conception validée par l’utilisateur le 7 novembre 2026.

## Objectif et approche

Préparer, réaliser et comparer plusieurs essais d’une ou plusieurs recettes dans
un plan commun. Premier cas : namelaka chocolat, griottes tièdes et tuile cacao.

Approches discutées :

1. Plans et composition d’abord, optimisation générale ensuite : approche recommandée
   et retenue pour cette proposition. Une matrice dessert de quatre dégustations
   illustre la couverture par paires ; les lignes restent modifiables manuellement.
2. Plans et optimiseur général ensemble : reporté, car il demande de définir les
   contraintes et stratégies de couverture avant d’avoir un premier usage réel.

Cette version implémente le plan, les variantes, les préparations, les dégustations
et leurs résultats. Aucun optimiseur général, moteur de coûts ou ordonnanceur
matériel n’est annoncé comme disponible. Ces suites restent dans ROADMAP.md.

Architecture actuelle conservée : HTML/CSS/JS natifs, PWA, localStorage, données
locales, schéma 1 étendu par des champs optionnels et sauvegardes JSON compatibles.
Pas de migration au démarrage ni de modification automatique des recettes/essais.

## Exemple dessert validé

| Axe | Variante 0 | Variante 1 |
| --- | --- | --- |
| Namelaka | Chocolat 75 % | Chocolat 72 % |
| Griottes | Sucre à 10 % du poids des fruits | Sucre à 15 % |
| Tuile | Absente | Présente |

La formulation de namelaka garde les mêmes quantités dans les deux variantes ;
seul le chocolat change. Pour 150 g de fruits, le sucre vaut respectivement 15 g
et 22,5 g avant ajustement du rendement. Ce sont des hypothèses d’essai, pas des
recettes validées. Les portions, températures de service et temps de repos doivent
être comparables ; le plan comporte une zone pour consigner ces conditions.

Matrice initiale proposée :

| Dégustation | Chocolat | Sucre des griottes | Tuile |
| --- | --- | --- | --- |
| D1 | 75 % | 10 % | Sans |
| D2 | 75 % | 15 % | Avec |
| D3 | 72 % | 10 % | Avec |
| D4 | 72 % | 15 % | Sans |

Les 8 combinaisons possibles sont distinguées des 4 lignes choisies. Cette matrice
couvre toutes les paires des trois axes, mais ne teste pas chaque interaction à
trois éléments et ne garantit pas le meilleur dessert. Après modification manuelle,
l’interface ne prétend plus à la même couverture sans la recalculer : cette première
version affiche uniquement le nombre de combinaisons théoriques et la liste choisie,
avec une explication attachée au modèle initial. Ajouter une dégustation de
confirmation ou une répétition est possible.

## Distinction essentielle : préparation et dégustation

- Une préparation est un lot réellement cuisiné d’une variante élémentaire et donne
  un essai du carnet existant (quantités, paramètres, observations, notes).
- Une dégustation assemble plusieurs préparations et porte une évaluation globale
  distincte des notes de chaque composant.
- La même préparation peut servir à plusieurs dégustations : aucune duplication
  automatique d’un essai ni de sa consommation n’est induite par sa réutilisation.
- Le modèle dessert propose donc 5 préparations distinctes (2 namelakas, 2 griottes,
  1 lot de tuiles), utilisées dans 4 dégustations. « Sans tuile » ne crée aucun essai.
- Pour comparer un nouveau lot, dupliquer explicitement la préparation et choisir
  celui utilisé par la dégustation. Une répétition ne se contente pas de recopier
  une note passée.

Les quantités de chaque préparation sont choisies dans les unités de sa référence,
comme aujourd’hui. Aucun nombre de portions n’est déduit d’un lot inconnu et aucune
quantité n’est multipliée implicitement par le nombre de dégustations.

## Recettes élémentaires du dessert et données existantes

La bibliothèque actuelle regroupe griottes et tuile dans une même fiche. Le bouton
« Créer le plan dessert » présente les sources et les ajouts avant enregistrement :

- réutiliser la recette namelaka sélectionnée, avec un instantané dans le plan ;
- créer une copie élémentaire « Griottes tièdes — élément », avec les fruits et sucre
  issus de la fiche choisie et ses étapes de chauffe/réduction ;
- créer « Tuile cacao — élément », en conservant les informations disponibles :
  pâte à tuile, étalage fin et cuisson indicative. La formule exacte et sa quantité
  manquent dans le MVP : elles sont marquées « à préciser », jamais inventées.

La fiche composée d’origine reste intégralement conservée. Les nouvelles fiches
sont créées uniquement par l’action explicite de création du modèle, après aperçu
et téléchargement d’une sauvegarde. Le plan garde les identifiants de ses sources.
L’utilisateur peut sélectionner d’autres recettes pour créer son propre plan.
Aucune recherche par nom ne remplace silencieusement une recette personnelle :
l’utilisateur choisit ou confirme les sources proposées.

Le plan peut être préparé avec la tuile incomplète, mais l’action « Démarrer cette
préparation » est bloquée tant que son instantané n’a pas une liste structurée
complète, avec quantités et rendement, ou une confirmation explicite des ingrédients
qualitatifs « au goût ». « Quantité à préciser » reste un manque à compléter.
Une correction de référence avant démarrage est une action explicite dans le plan ;
elle ne réécrit pas les préparations déjà réalisées. Les dégustations sans tuile
peuvent être réalisées indépendamment.

## Parcours générique

1. Nouvelle entrée de navigation « Plans de test » ; liste avec projet, nom et
   progression des préparations et dégustations.
2. Créer un plan vide ou utiliser le modèle dessert. Renseigner nom, projet,
   objectif, hypothèses, critères d’évaluation et conditions communes.
3. Choisir les recettes élémentaires, figer leurs références dans le plan et créer
   des variantes nommées. Une variante peut être absente ou incluse. Pour une variante
   incluse, définir les modifications d’ingrédient (nom et quantité de référence),
   le rendement cible et les notes de procédure. Les modifications sont visibles,
   distinctes du texte de la référence ; aucun texte libre n’est exécuté comme code.
4. Ajouter les préparations nécessaires et choisir celles de chaque dégustation.
   Une ligne ne peut utiliser deux variantes du même composant. Il est possible de
   préparer un seul composant ou de tester un assemblage complet.
5. Démarrer une préparation ouvre le formulaire d’essai existant, avec les bonnes
   quantités, les modifications et la référence figée. Seul l’enregistrement de
   l’essai le lie définitivement au plan ; annuler ne crée pas un essai fantôme.
6. Enregistrer une dégustation : date, état, observations, critères notés de 0 à 10
   ou laissés inconnus, verdict et prochaine hypothèse. Dans le modèle dessert :
   texture, amertume, acidité, croustillant et équilibre global.
7. Comparer les dégustations dans un tableau et rédiger la conclusion du plan.
   Une note absente est affichée « Non évalué », jamais remplacée par zéro ou cinq.
   Aucune recette de référence n’est automatiquement promue ou remplacée.

L’amertume et l’acidité sont évaluées comme appréciation de l’équilibre, avec
indication explicite « 10 = équilibre souhaité », pour ne pas confondre note élevée
et intensité élevée. Les observations restent nécessaires pour préciser la sensation.
Pas de classement global automatique fondé sur une moyenne arbitraire.

## Modèle et invariants proposés par Codex

Ajouter `testPlans` optionnel au document JSON. Son absence signifie « aucun plan »
en mémoire, sans sauvegarde imposée. Les propriétés précises relèvent de
l’implémentation, avec les contrats suivants :

- Plan : identifiant, projet, nom, objectif, hypothèses, conditions, critères,
  conclusion, état et dates ; composants, préparations et dégustations inclus.
- Composant : identifiant, nom, identifiant de recette source, instantané complet
  indépendant de sa référence et variantes identifiées.
- Variante : nom, inclusion/absence, modifications explicites, rendement cible.
  Une variante absente n’a ni lot ni essai. Une variante incluse produit une fiche
  effective cohérente ; le nom d’ingrédient 72 % doit être visible dans le lot 72 %,
  sans être présenté comme le chocolat 75 % de sa source.
- Préparation : identifiant, variante, quantité cible, état et éventuel `trialId`.
  Le lot et sa formulation effective sont figés au démarrage. Un essai sauvegardé
  conserve une provenance de plan et les informations nécessaires à sa lecture
  même hors de l’écran du plan. Un lot utilisé dans plusieurs dégustations garde
  un seul identifiant d’essai.
- Dégustation : identifiant, libellé, références de préparations, état, date,
  observations, notes par critère et verdict. Pour la marquer réalisée, ses
  préparations incluses doivent être reliées à des essais enregistrés.
- Les listes et liens sont validés à l’import et avant écriture : identifiants
  uniques, références existantes, états autorisés, valeurs finies et notes 0–10.
- Pas de suppression en cascade. Supprimer un essai lié à un plan est bloqué avec
  explication ; le retirer d’une dégustation n’efface jamais l’essai du carnet.
- Les éléments de structure utilisés par un essai réalisé ou une dégustation
  réalisée ne sont plus modifiables. Les ajouts et corrections futurs utilisent
  des variantes/lots distincts ; les noms descriptifs et notes de conclusion
  peuvent toujours être corrigés sans réécrire les mesures passées.
- Archiver un plan le conserve. La duplication produit de nouveaux identifiants,
  garde ses références et variantes, remet résultats/liens/états à zéro et
  conserve les recettes sources. Pas de suppression définitive de plan dans
  cette première version.
- La préparation d’un modèle et l’enregistrement de ses nouvelles recettes forment
  une seule écriture transactionnelle ; une erreur de stockage conserve le
  brouillon et ne laisse ni plan ni recette partiellement enregistrés.

L’utilisateur ne doit pas devoir distinguer un « essai prévu » d’un essai déjà
cuisiné à partir d’un simple numéro V : l’état et la provenance sont visibles.
Les essais hors plan continuent à fonctionner sans champs supplémentaires requis.

## Sauvegardes, tests et publication

JSON : exporter/importer plans, liens, références, résultats et essais sans perte.
Markdown : inclure objectif, matrice, préparations, quantités, observations et
conclusion ; distinguer prévu et réalisé. Les anciens exports restent importables.
La clé localStorage, les autres champs et les protections contre corruption/quota
restent conservés. Les données du plan ne sont envoyées à aucun serveur.

Tests automatiques : schéma optionnel et import ancien, liens invalides et notes,
matérialisation chocolat/sucre, quantités réduites, instantanés indépendants,
réutilisation d’un lot, absence de tuile sans essai fantôme, annulation, duplication,
blocage de suppression liée, échec transactionnel et exports aller-retour.

Tests Chromium : création modèle et sauvegarde, personnalisation d’un plan vide,
préparations et quatre dégustations, comparaison, confirmation d’un nouveau lot,
réouverture, export/import, références ultérieurement modifiées, tablette/mobile
et bureau, hors ligne et mise à jour du cache. Android physique et audio ne sont
pas prétendus sans appareil réel.

Après validation : implémentation sur branche, tests, revue indépendante, PR,
publication Pages et vérification de l’application et des assets publics.
