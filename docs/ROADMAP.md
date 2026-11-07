# Pistes d’évolution d’Atelier Saveurs

La gestion manuelle des plans et compositions est implémentée en version 0.3.
Les optimisations, coûts et améliorations ci-dessous restent des pistes futures. La version actuelle prépare les quantités, unités et instantanés
nécessaires, sans introduire de synchronisation ni catalogue global obligatoire.

## 1. Plans de test culinaires — socle disponible

Un plan regroupe des essais d’une ou plusieurs recettes autour d’un objectif :
par exemple choisir une sauce et une cuisson pour un plat. Il précise hypothèses,
variables, modalités, critères de réussite, dégustateurs, quantités et ressources.
Séparer essais prévus, réalisés, abandonnés et répétés ; un plan ne modifie jamais
une recette validée sans une décision explicite. Garder la version exacte de chaque
recette élémentaire utilisée dans le plan.

## 2. Réduire les combinaisons à réaliser

Représenter un plat comme un assemblage de recettes élémentaires : viande, sauce,
légume, accompagnement. Choisir ensuite l’objectif de couverture : effets isolés,
toutes les paires de variantes, interactions ciblées ou toutes les combinaisons.
Avec trois éléments offrant deux variantes chacun, une recherche exhaustive fait
8 assemblages. Les assemblages A0/B0/C0, A0/B1/C1, A1/B0/C1 et A1/B1/C0 couvrent
toutes les paires avec 4 assemblages ; ils ne prouvent pas l’absence d’une
interaction spécifique aux trois éléments.

Le moteur devrait afficher la couverture et ses limites, respecter les assemblages
interdits, les équipements disponibles et le budget, et réutiliser les préparations
communes. Commencer par une heuristique explicable ; ne pas annoncer un minimum
global ni le « meilleur plat » sans preuve. Les interactions suspectées nécessitent
des essais supplémentaires, et les résultats prometteurs une répétition.

## 3. Coûts des ingrédients, recettes et essais

Associer un ingrédient à un prix daté et un conditionnement, avec sa quantité nette
utilisable et les pertes. Distinguer la dépense d’achat (un paquet entier) du coût
consommé par un essai, puis présenter coût du lot, de la portion et du plan.
Un prix inconnu doit rester inconnu plutôt que devenir zéro. Conserver un instantané
des coûts de l’essai pour ne pas réécrire son historique lorsque les prix changent.
Les densités et rendements de transformation doivent être explicitement renseignés.

## 4. Comparaison normalisée des essais

Présenter les différences par portion ou par 100 g, en complément des quantités
réellement réalisées. Montrer variables changées, notes, coûts et temps côte à côte.
Un essai à petite échelle peut avoir un autre résultat thermique : signaler cette
différence au lieu de supposer une équivalence parfaite.

## 5. Organisation d’une session de cuisine

Construire une liste consolidée d’ingrédients et un déroulé à partir des dépendances,
repos et équipements. Mutualiser les préparations communes, réserver four et plaques,
et distinguer temps actif, temps écoulé et marge avant dégustation. L’utilisateur
doit pouvoir corriger le déroulé et ses contraintes.

## 6. Fiabilité des conclusions

Documenter l’hypothèse avant l’essai, repérer les changements simultanés et proposer
un témoin ou une répétition. Une dégustation comparative éventuellement à l’aveugle
peut réduire le biais d’attente. Séparer préférence personnelle, appréciation du
panel et effet reproductible ; éviter une moyenne trompeuse avec peu de dégustations.

## Ordre recommandé

Plans et composition de plats → couverture explicable des combinaisons → coûts →
organisation de session, en intégrant comparaison et répétitions progressivement.
Chaque étape doit conserver les sauvegardes, les instantanés et l’usage local.


## État de la première étape

Disponible : plans libres, composants et variantes figés, préparations partagées,
dégustations indépendantes, modèle dessert éditable et comparaison par critère.
Le modèle à quatre lignes est un exemple de matrice, pas un solveur général.
La prochaine étape reste la génération explicable de combinaisons et leur
couverture, suivie du chiffrage des ingrédients et des plans.
