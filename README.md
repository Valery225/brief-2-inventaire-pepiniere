# Inventaire de la pépinière

> Projet individuel du SAS DFS, brief 2 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

L'outil s'adresse au responsable d'une pépinière pédagogique, qui observe les étiquettes et les organes des plants, reproduit la classification botanique fournie, compte les plants et note la date du relevé. Son inventaire est dispersé, et il veut retrouver une espèce, lire son groupe botanique et voir les quantités disponibles. Pour chaque espèce, l'utilisateur saisit cinq champs (id, nom commun, groupe, nombre de plants et date du relevé). Les saisies invalides sont refusées. Le programme affiche la liste de l'inventaire, permet de rechercher par code, nom ou groupe, de trier par nombre de plants, et donne une synthèse. L'outil ne reconnaît pas lui-même l'espèce ni son groupe à partir des organes.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
cd brief-2-inventaire-pepiniere
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/plants.json`
- [x] Ajouter un plant, saisies invalides refusées sans arrêter le programme
- [x] Lister l'inventaire, message si l'inventaire est vide
- [x] Rechercher par code ou par nom ; filtrer par groupe botanique
- [x] Trier par nombre de plants
- [x] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
- [x] Bonus : supprimer et modifier un plant (choix 6 et 7)
- [x] Bonus : tri décroissant, groupe le plus fourni

## Données

✏️ *Le fichier, le nombre de lignes, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), l'unité. Rappelez qu'elles sont fictives et que les groupes sont fournis par le coach.*

Les données de l'inventaire sont stockées dans le fichier donnees/plants.json.
Le fichier contient 10 lignes d'inventaire fictives au démarrage. Chaque ligne représente une espèce végétale et comporte cinq champs:
- id : identifiant unique de l'espèce.
- nomCommun : nom commun de l'espèce.
- groupe: groupe botanique de l'espèce (angiosperme ou gymnosperme).
- nombrePlants : quantité de plants disponibles, exprimée en nombre de plants.
- dateReleve : date du comptage, au format AAAA-MM-JJ.  
Les groupes botaniques sont fournis et validés par le coach agronomie à partir de la fiche botanique de référence.
Les données initiales sont fictives et servent de base pour tester l'application. Les nouvelles informations saisies sont enregistrées dans le fichier JSON.

## Limites

✏️ *Au moins trois. Par exemple : le seuil de 10 plants est un repère de suivi, pas une recommandation de production.*
- Les données initiales sont fictives et ne représentent pas nécessairement les stocks réels d'une pépinière.
- La fiabilité des résultats dépend de l'exactitude des informations saisies et des comptages réalisés.
- L'application fonctionne localement avec node.js et ne dispose pas encore d'une base de données.

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
YAO JEAN VALERY KOFFI, Valery225, les échanges avec les autres apprenants ont porté sur la compréhension des consignes, les notions JavaScript et la résolution de difficultés techniques. J'ai également partagé mes connaissances en agronomie, notamment sur la classification botanique des végétaux.
