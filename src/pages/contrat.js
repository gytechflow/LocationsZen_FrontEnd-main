import React from 'react';
import { useState } from 'react'; // importation de useState pour utiliser les hooks d'état de React
import axios from 'axios';

export default function Contrat() {
  const [noms, setNoms] = useState(''); // déclaration d'un état nommé "noms" et une fonction pour le mettre à jour nommée "setNoms"
  const [prenoms, setPrenoms] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [montantLoyer, setMontantLoyer] = useState(0);
  const [dureeContrat, setDureeContrat] = useState(0);
  const [caution, setCaution] = useState(0);
  const [telephone, setTelephone] = useState('');
  const [numeroChambre, setNumeroChambre] = useState('');
  const [newIndex, setNewIndex] = useState('');

  const handleSubmit = async (event) => { // fonction appelée lors de la soumission du formulaire
    event.preventDefault(); // empêcher le comportement par défaut du formulaire

    const nbMois = getNbMois(dateDebut, dateFin); // calculer le nombre de mois entre la date de début et la date de fin
    const montantTotal = nbMois * montantLoyer; // calculer le montant total en multipliant le nombre de mois par le montant du loyer
    const cautionTotal = 2 * montantLoyer; // calculer la caution totale en multipliant le montant du loyer par 2

    // Envoi des données au serveur API en utilisant Axios
    try {
      const response = await axios.post('https://example.com/api/contrats', {
        noms,
        prenoms,
        dateDebut,
        dateFin,
        montantLoyer,
        dureeContrat: nbMois,
        caution,
        montantTotal,
        cautionTotal,
        telephone,
        numeroChambre,
        newIndex,
      });

      // Affichage de la réponse du serveur dans la console
      console.log(response.data);
    } catch (error) {
      // Affichage des erreurs éventuelles dans la console
      console.error(error);
    }
  };

  // Fonction pour calculer le nombre de mois entre deux dates
  const getNbMois = (dateDebut, dateFin) => {
    // TODO: calculer le nombre de mois entre les deux dates

    const debut = new Date(dateDebut); // instanciation d'un nouvel objet Date à partir de la date de début passée en argument
    const fin = new Date(dateFin); // instanciation d'un nouvel objet Date à partir de la date de fin passée en argument
    
    const diff = fin.getTime() - debut.getTime(); // différence en millisecondes entre la date de fin et la date de début
    const mois = diff / (1000 * 60 * 60 * 24 * 30); // conversion de la différence en mois
    
    return Math.ceil(mois); // renvoyer le nombre de mois arrondi à l'entier supérieur pour éviter les décimales
  };

  return (
    <div className='contrat'>
      {/* Formulaire pour ajouter un nouveau contrat */}
      <form onSubmit={handleSubmit} className="contrat-form">
        <div className="form-group">
          <label htmlFor="noms">Noms:</label>
          <input
            id="noms"
            type="text"
            value={noms}
            onChange={(event) => setNoms(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prenoms">Prénoms:</label>
          <input
            id="prenoms"
            type="text"
            value={prenoms}
            onChange={(event) => setPrenoms(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telephone">Téléphone:</label>
          <input
            id="telephone"
            type="tel"
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numeroChambre">Numéro de chambre:</label>
          <input
            id="numeroChambre"
            type="text"
            value={numeroChambre}
            onChange={(event) => setNumeroChambre(event.target.value)}
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="newIndex">Index du locataire:</label>
          <input
            id="newIndex"
            type="number"
            value={newIndex}
            onChange={(event) => setNewIndex(event.target.value)}
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="dateDebut">Date de début:</label>
          <input
            id="dateDebut"
            type="date"
            value={dateDebut}
            onChange={(event) => setDateDebut(event.target.value)}
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="dateFin">Date de fin:</label>
          <input
            id="dateFin"
            type="date"
            value={dateFin}
            onChange={(event) => setDateFin(event.target.value)}
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="montantLoyer">Montant du loyer:</label>
          <input
            id="montantLoyer"
            type="number"
            value={montantLoyer}
            onChange={(event) => setMontantLoyer(parseFloat(event.target.value))}
            required
          />
        </div>
    
        <button type="submit">Ajouter</button>
      </form>
    </div>
    );
    }