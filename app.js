// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';
import { groupeLePlusFourni, modifierPlant, supprimerPlant, trierParNombrePlantsDecroissant } from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/plants.json';

function afficherMenu() {
  console.log('\n--------------------- MENU ---------------------');
  console.log('1. Ajouter un plant');
  console.log('2. Lister l\'inventaire');
  console.log('3. Rechercher (code, nom, groupe)');
  console.log('4. Trier (nombre de plants)');
  console.log('5. Synthèse des quantités');
  console.log('6. Supprimer un plant');
  console.log('7. Modifier un plant');
  console.log('0. Quitter');
}

async function main() {
  ouvrirSaisie();

  let plants = [];

  try {
    console.log('==================================================');
    console.log('   INVENTAIRE DE LA PÉPINIÈRE');
    console.log('   Pépinière pédagogique');
    console.log('==================================================');

    try {
      plants = await chargerJson(FICHIER_DONNEES);
      console.log(`${plants.length} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
    } catch (erreur) {
      console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. L'inventaire démarre vide.`);
      plants = [];
    }

    let continuer = true;

    while (continuer) {
      afficherMenu();
      const choix = await demander('Votre choix : ');

      if (choix === null) {
        continuer = false;
        break;
      }

      try {
        switch (choix.trim()) {
          case '1': {
            console.log('--- Ajouter un plant ---');
            const code = await demander('Code du plant (ex. N11) : ');
            if (code === null) {
              break;
            }

            const nom = await demander('Nom commun (ex. papayer) : ');
            if (nom === null) {
              break;
            }

            const groupe = await demander('Groupe botanique (angiosperme ou gymnosperme) : ');
            if (groupe === null) {
              break;
            }

            const nombre = await demander('Nombre de plants (entier) : ');
            if (nombre === null) {
              break;
            }

            const date = await demander('Date du relevé (AAAA-MM-JJ) : ');
            if (date === null) {
              break;
            }

            const saisie = {
              id: String(code).trim().toUpperCase(),
              nomCommun: String(nom).trim().toLowerCase(),
              groupe: String(groupe).trim().toLowerCase(),
              nombrePlants: String(nombre).trim(),
              dateReleve: String(date).trim(),
            };

            const erreurs = ajouterPlant(plants, saisie);
            if (erreurs.length > 0) {
              console.log('Ajout refusé :');
              for (const erreur of erreurs) {
                console.log(`  - ${erreur}`);
              }
              console.log(`L'inventaire compte toujours ${plants.length} espèce(s).`);
              break;
            }

            await enregistrerJson(FICHIER_DONNEES, plants);
            console.log(`Plant ${saisie.id} ajouté. L'inventaire compte ${plants.length} espèce(s).`);
            break;
          }

          case '2': {
            console.log(`\n--- Inventaire (${plants.length} espèce(s)) ---`);
            console.log(listerPlants(plants));
            break;
          }

          case '3': {
            console.log('--- Rechercher ---');
            console.log('1. Par code');
            console.log('2. Par nom commun');
            console.log('3. Les espèces d\'un groupe botanique');
            const sousChoix = await demander('Votre choix : ');

            if (sousChoix === null) {
              break;
            }

            switch (sousChoix.trim()) {
              case '1': {
                const code = await demander('Code : ');
                if (code === null) {
                  break;
                }
                const id = String(code).trim().toUpperCase();
                const plant = trouverParId(plants, id);
                if (plant === undefined) {
                  console.log(`Plant ${id} introuvable.`);
                } else {
                  console.log(formaterPlant(plant));
                }
                break;
              }

              case '2': {
                const texte = await demander('Nom ou partie du nom : ');
                if (texte === null) {
                  break;
                }
                const recherche = String(texte).trim().toLowerCase();
                const resultat = rechercherParNom(plants, recherche);
                console.log(`${resultat.length} espèce(s) dont le nom contient « ${recherche} » :`);
                console.log(listerPlants(resultat));
                break;
              }

              case '3': {
                const groupe = await demander('Groupe (angiosperme ou gymnosperme) : ');
                if (groupe === null) {
                  break;
                }
                const groupeValide = String(groupe).trim().toLowerCase();
                const resultat = filtrerParGroupe(plants, groupeValide);
                console.log(`${resultat.length} espèce(s) du groupe ${groupeValide} :`);
                console.log(listerPlants(resultat));
                break;
              }

              default:
                console.log('Choix inconnu : retour au menu.');
            }
            break;
          }

          case '4': {
            console.log('--- Trier ---');
            console.log('1. Par nombre de plants croissant');
            console.log('2. Par nombre de plants décroissant');
            const sousChoix = await demander('Votre choix : ');

            if (sousChoix === null) {
              break;
            }

            switch (sousChoix.trim()) {
              case '1':
                console.log(listerPlants(trierParNombrePlants(plants)));
                break;
              case '2':
                console.log(listerPlants(trierParNombrePlantsDecroissant(plants)));
                break;
              default:
                console.log('Choix inconnu : retour au menu.');
            }
            break;
          }

          case '5': {
            console.log('--- Synthèse de l\'inventaire ---');
            const synthese = syntheseParGroupe(plants);
            const groupes = Object.entries(synthese);
            console.log(`Nombre d'espèces : ${plants.length}`);
            console.log(`Stock total : ${totalPlants(plants)} plants`);
            console.log('Par groupe botanique :');
            for (const [groupe, infos] of groupes) {
              console.log(`  ${groupe} : ${infos.especes} espèce(s), ${infos.plants} plants`);
            }

            const groupeLePlusFourniValue = groupeLePlusFourni(plants);
            if (groupeLePlusFourniValue === null) {
              console.log('Groupe le plus fourni : aucune donnée');
            } else {
              console.log(`Groupe le plus fourni : ${groupeLePlusFourniValue.groupe} (${groupeLePlusFourniValue.plants} plants)`);
            }

            const planteAbondante = especeLaPlusAbondante(plants);
            if (planteAbondante === null) {
              console.log('Espèce la plus abondante : aucune donnée');
            } else {
              console.log(`Espèce la plus abondante : ${formaterPlant(planteAbondante)}`);
            }

            const faibles = stocksFaibles(plants, SEUIL_STOCK_FAIBLE);
            console.log(`Stocks faibles (≤ ${SEUIL_STOCK_FAIBLE} plants) : ${faibles.length}`);
            for (const plant of faibles) {
              console.log(`  ${formaterPlant(plant)}`);
            }
            console.log(`Rappel : le seuil de ${SEUIL_STOCK_FAIBLE} plants est un repère pédagogique de suivi, pas une recommandation de production.`);
            break;
          }

          case '6': {
            const id = await demander('Identifiant : ');
            if (id === null) {
              break;
            }
            const plantSupprime = supprimerPlant(plants, String(id).trim().toUpperCase());
            if (plantSupprime === undefined) {
              console.log(`Plant ${String(id).trim().toUpperCase()} introuvable.`);
            } else {
              await enregistrerJson(FICHIER_DONNEES, plants);
              console.log(`Plant ${plantSupprime.id} supprimé. L'inventaire compte ${plants.length} espèce(s).`);
            }
            break;
          }

          case '7': {
            const id = await demander('Identifiant : ');
            if (id === null) {
              break;
            }
            const identifiant = String(id).trim().toUpperCase();
            const champ = await demander('Champ à modifier (nomCommun, groupe, nombrePlants, dateReleve) : ');
            if (champ === null) {
              break;
            }
            const nouvelleValeur = await demander('Nouvelle valeur : ');
            if (nouvelleValeur === null) {
              break;
            }

            const valeur = String(nouvelleValeur).trim();
            const erreurs = modifierPlant(plants, identifiant, String(champ).trim(), valeur);
            if (erreurs.length > 0) {
              console.log('Modification refusée :');
              for (const erreur of erreurs) {
                console.log(`  - ${erreur}`);
              }
              break;
            }

            await enregistrerJson(FICHIER_DONNEES, plants);
            console.log(`Plant ${identifiant} modifié.`);
            break;
          }

          case '0':
            console.log('Au revoir !');
            continuer = false;
            break;

          default:
            console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
        }
      } catch (erreur) {
        const message = erreur.message || String(erreur);

        if (message.startsWith('TODO')) {
          console.log(`À compléter : ${message}`);
        } else {
          console.log(`Erreur inattendue : ${message}`);
        }
      }
    }
  } finally {
    fermerSaisie();
  }
}

main();
