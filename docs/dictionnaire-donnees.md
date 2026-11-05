# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | N09 |
| nomCommun | Nom commun de l'espèce| texte | non vide | — |cacao |
| groupe | Grand groupe botanique   | texte | valeur parmi la liste autorisée| — | angiosperme|
| nombreplants |Nombre de plants en stock | nombre| entier positif ou nul |sans unité |30 |
| dateReleve | Date du comptage des plants | texte | AAAA-MM-JJ | — | 2026-10-24 |

**Listes de valeurs autorisées** :
- Groupe botanique:  angiosperme, gymnosperme.
- Nompbre de plants:  nombres entiers positifs ou nul.
- Date du relevé:  dates valides au format AAAA-MM-JJ.

**Sources** : 
- SUJET.md:  document de référence présentant les besoins et les exigences du projet.
- donnees/plants.json:  fichier contenant les données initiales des dix espèces de la pépinière.
- src/registre.js:  fichier contenant les règles de validation des informations enregistrées.
- src/outils.js:  fichier contenant les fonctions de conversion numérique et de validation des dates.
