# Quantités, essais à échelle variable et durées — conception proposée

Statut : à valider avant implémentation.

## Intention et décisions utilisateur

La recette décrit une référence reproductible ; chaque essai peut préparer une
quantité différente et ajuster les ingrédients sans altérer cette référence.
L’utilisateur a choisi un rendement de référence et un rendement cible plutôt
qu’un simple coefficient. Il demande également les temps estimés et la correction
des placements de libellés et boutons, sans refonte générale.

## Approches examinées

1. Coefficient seul : rapide mais moins pratique pour demander 150 g de sauce.
2. Rendement de référence et cible : approche retenue par l’utilisateur ; facteur
   calculé à partir de quantités exprimées dans des unités compatibles.
3. Conversion automatique de tout le texte existant : non retenue, car les sept
   fiches comportent des plages, sous-recettes et mentions sans quantité. Les
   interpréter automatiquement pourrait changer leur sens.

## Périmètre de cette version

- Ingrédients structurés, rendement de référence, recalcul par essai et ajustements.
- Temps estimés dans la recette et chaque essai.
- Corrections ciblées de disposition, accessibilité des champs et libellés français.
- Export/import JSON et Markdown enrichis, tests et publication après vérification.
- Architecture HTML/CSS/JS natifs, localStorage et PWA conservée.

Plans de test, moteur de combinaisons et suivi des coûts sont décrits en perspectives
ci-dessous ; ils ne sont pas implémentés dans cette version.

## Données et compatibilité

Proposition technique de Codex : extensions optionnelles du schéma existant
`schema: 1`, clé localStorage inchangée. Pas de migration globale ni de réécriture
au démarrage. Les anciennes recettes et les anciens essais restent lisibles,
exportables et importables sans nouveaux champs obligatoires.

Une recette peut ajouter :

- `formulation`: `{ yield: { quantity, unit }, ingredients: [...] }`.
- Une ligne d’ingrédient : `{ id, name, quantity, unit, note }`.
- `quantity` est un nombre strictement positif ou `null` pour une quantité libre,
  par exemple « au goût » dans `note`. Les plages restent dans les notes ou le
  texte original ; aucune quantité centrale n’est inventée.
- `estimatedMinutes`: `{ preparation, cooking, resting, total }`, chaque valeur
  étant un nombre fini positif ou nul, ou `null` pour « non renseigné ».

Le texte existant `ingredients` reste conservé et accessible sous « Notes et
liste d’origine ». Activer la saisie structurée est une action explicite dans
l’éditeur : saisir les lignes et le rendement, vérifier puis enregistrer.
Aucun parsing automatique ni conversion des sept fiches au chargement.
La saisie structurée devient la liste utilisée pour le calcul ; les notes
originales n’entrent pas dans les sommes, et l’interface le précise.
Une ligne vide ajoutée par erreur peut être retirée du brouillon.

Un nouvel essai issu d’une recette structurée conserve dans son `snapshot` une
copie indépendante du rendement, des lignes et des estimations de la référence.
Il stocke aussi `batch`: `{ targetYield, adjustments }`, avec `adjustments`
associant les identifiants des lignes à des quantités effectives manuelles.
Un ajustement peut être un nombre positif ou `null` (quantité libre) ; une action
« Revenir au calcul » supprime cet ajustement. Un ingrédient omis est indiqué
explicitement dans la note de l’essai ; zéro n’est pas interprété silencieusement.
Les temps estimés propres à l’essai sont copiés de la référence puis modifiables.

Un ancien essai reste affiché avec son instantané original. Aucun rendement ni
aucune formulation n’est reconstitué à partir de la recette actuelle. Un nouveau
essai part de la référence actuelle ; reprendre les paramètres d’un essai passé
sera une action future distincte, pour éviter une ambiguïté dans « Nouvelle version ».

La validation porte sur les extensions lorsqu’elles sont présentes, y compris
les nombres finis, unités admises, identifiants uniques de lignes et références
d’ajustement. Une sauvegarde invalide est rejetée avant tout remplacement.
Les échecs de stockage ne ferment pas le brouillon et ne prétendent pas réussir.
L’export JSON reste toujours accessible avant modification ; l’éditeur rappelle
la sauvegarde avant la première activation des champs structurés.

## Calculs et unités

Unités de rendement : portion, pièce, mg, g, kg, ml, cl, l.
Unités d’ingrédient : mêmes unités, plus c. à café, c. à soupe, pincée et une unité
vide pour les lignes qualitatives. Les libellés affichés sont en français.

- Masse : mg, g, kg ; volume : ml, cl, l. Conversion exacte dans chaque famille.
- Portion, pièce, cuillerées et pincée : seulement la même unité entre elles.
- Pas de conversion masse/volume, ni de conversion implicite cuillerée/ml.
- Facteur = rendement cible converti dans l’unité de référence / rendement de référence.
- Quantité calculée = quantité de référence × facteur, dans l’unité de la ligne.
- Quantités libres : texte conservé, pas de multiplication.
- Virgule ou point décimal acceptés en saisie ; valeurs stockées comme nombres.
- Rejet des valeurs vides obligatoires, négatives, nulles, infinies ou d’une
  conversion incompatible ; message proche du champ, brouillon conservé.
- Calcul non arrondi en mémoire ; affichage jusqu’à trois décimales, sans modifier
  la valeur enregistrée pour satisfaire l’affichage. Une petite quantité ne doit
  jamais être affichée comme zéro : notation adaptée si nécessaire.
- Une pièce fractionnaire reste affichée (ex. 0,5 œuf), sans arrondi automatique.
- Un changement de rendement recalcule les lignes automatiques ; les ajustements
  manuels restent fixes et marqués « Ajusté manuellement ». Les réinitialiser est
  une action explicite. L’interface rappelle ce comportement au changement.

Exemples d’acceptation : 6 portions et 300 g de farine → essai 2 portions = 100 g ;
500 g de rendement → cible 0,125 kg = facteur 0,25 ; 1,2 g de gélatine × 0,5 = 0,6 g.
Cible en ml pour référence en g : refusée. Un essai ajusté à 110 g reste à 110 g
quand sa cible change, puis revient au calcul via le bouton explicite.

## Temps estimés

Préparation active, cuisson et repos sont saisis en minutes et affichés en heures
et minutes. Une valeur absente signifie « Non renseigné », distinct de zéro.
Le total est facultatif et explicite, car cuisson, repos et préparation peuvent
se chevaucher. Si tous les sous-temps sont connus et que le total est absent,
afficher leur somme comme « Somme des durées, hors chevauchements », sans
l’enregistrer comme une estimation confirmée. Sinon ne pas inventer de total.
Ni les temps ni les températures des instructions ne sont multipliés par le facteur.
Les temps sont visibles dans la fiche, le formulaire d’essai et l’essai archivé.

## Interface et contrôles visuels

Corrections proposées par Codex, à confirmer par observation du rendu :

- À faible largeur, placer les actions sous le titre si nécessaire, sans écraser
  les libellés ni couper le texte des boutons.
- Navigation mobile sur deux lignes si nécessaire, tous les intitulés accessibles.
- Champs structurés en lignes sur bureau, cartes empilées sur mobile : libellés
  visibles et associés aux contrôles par `for`/`id`, boutons d’ajout/retrait alignés.
- Zones tactiles de boutons d’au moins 44 px ; focus visible ; actions principales
  et annulation regroupées, suppression visuellement distincte.
- Notes d’évaluation sans chevauchement du libellé, curseur et valeur.
- Notifications placées pour ne pas masquer durablement les actions du formulaire.
- Verdicts affichés en français ; valeurs techniques stockées inchangées.

La disposition exacte relève de l’implémentation et des tests visuels ; conserver
la palette et l’organisation existantes. Pas de refonte React.

## Exports et vérifications attendues

JSON : conservation intégrale des nouveaux champs, des notes d’origine et des
instantanés. Import d’un ancien fichier inchangé et aller-retour d’un nouveau.
Markdown : rendement de référence et cible, facteur, ingrédients calculés et
ajustés, unités, estimations, observations et verdict français. Pour les anciens
essais sans formulation, conserver les informations réellement disponibles.

Tests Node ciblés : conversions, calculs, saisie décimale, quantités libres,
ajustements, valeurs invalides, validation des extensions et immutabilité des
instantanés. Conserver les tests de protection du stockage existants.

Tests Chromium avec Playwright : parcours ancien fichier → recette structurée →
essais 6/2 portions → ajustement manuel → changement de cible → enregistrement →
rechargement → export/import ; affichage des temps et corrections de disposition
aux largeurs 360, 390, 844 et 1280 px. Captures, absence de débordement de page,
aucune erreur JS. Android physique et dictée audio restent non prétendus.

Rejouer les parcours ACCEPTANCE, le fonctionnement hors ligne et l’actualisation
PWA après incrément de cache. Vérifier le site publié et les assets réels.

## Perspectives à conserver dans la réflexion

1. Plan de test : objectif, hypothèses, plusieurs essais d’une ou plusieurs recettes,
   critères de réussite et ressources ; séparer ce qui est prévu de ce qui est réalisé.
2. Plat composé : références vers les recettes élémentaires et leur version ;
   optimiser d’abord une couverture choisie (par exemple toutes les paires), sous
   contraintes de matériel et budget. Ne pas promettre le minimum global ni la
   meilleure combinaison culinaire ; expliciter les interactions non couvertes.
3. Coûts : prix daté, conditionnement, rendement utilisable et pertes ; distinguer
   consommation et achats. Garder le coût historique d’un essai lorsque les prix évoluent.
4. Comparaison normalisée : coûts, ingrédients et résultats par portion ou 100 g.
5. Organisation de session : mutualiser les préparations et ordonner les opérations
   selon temps de repos, équipements et dépendances.
6. Qualité des conclusions : relever les variables changées, répéter les essais
   prometteurs et distinguer préférence de dégustation et effet reproductible.

Ces perspectives n’imposent aujourd’hui ni catalogue global d’ingrédients,
ni backend, ni synchronisation, ni changement de stockage.
