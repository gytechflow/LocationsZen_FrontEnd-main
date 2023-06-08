import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Facturation() {
  const [data, setData] = useState([
    {
      numero_chambre:'T6',
      locataire: 'John Doe',
      telephone: '514-555-1234',
      ancienIndex: 1000,
      newIndex: null,
      quantite: null,
      total: null
    },
    {
      numero_chambre:'T7',
      locataire: 'Jane Smith',
      telephone: '514-555-5678',
      ancienIndex: 2000,
      newIndex: null,
      quantite: null,
      total: null
    },
  ]);
  
  const [totalMontant, setTotalMontant] = useState(0);

  // Récupérer les données de votre base de données lors du montage du composant
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('your-api-endpoint');
      setData(response.data);
    }
    fetchData();
  }, []);

  // Mettre à jour le montant total pour une ligne spécifique lors de la saisie du nouvel index
  function handleNewIndexChange(row, newIndex) {
    const oldIndex = row.ancienIndex;
    const quantity = newIndex - oldIndex;
    const qwt = 125;
    const total = (quantity * qwt) + 2000 + 200;

    const updatedRow = { ...row, newIndex, quantite: quantity, total };
    const updatedData = [...data];
    const rowIndex = updatedData.indexOf(row);
    updatedData[rowIndex] = updatedRow;
    setData(updatedData);
  }

  // Enregistrer les données mises à jour dans la base de données
  async function saveData() {
    try {
      const response = await axios.post('your-api-endpoint', { data });
      console.log(response.data); // handle success
    } catch (error) {
      console.error(error); // gérer l'erreur
    }
  }

  // telecharger la page en pdf
  function handleDownload() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1189, 841]
    });
  
    let dataForPdf = [];
  
    data.forEach((row) => {
      let newRow = [
        row.numero_chambre,
        row.locataire,
        row.telephone,
        row.ancienIndex,
        row.newIndex || "",
        row.quantite || "",
        "125",
        "2000",
        row.total || ""
      ];
      dataForPdf.push(newRow);
    });
  
    // Ajout de la variable totalMontant à la dernière ligne du tableau
    dataForPdf.push(["", "", "", "", "", "","","total Facture", totalMontant  ]);
  
    doc.autoTable({
      head: [['N°', 'Locataire', 'N° Telephone', 'Ancien Index', 'Nouvel Index', 'Quantité', 'Qwt', 'Gardinage','Total' ]],
      body: dataForPdf
    });
  
    // Ajout de la date actuelle au nom du fichier PDF
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const fileName = `facturation (${dateString}).pdf`;
  
    doc.save(fileName);
  }
  
  
  useEffect(() => {
    let total = 0;
    data.forEach((row) => {
      if (row.total) {
        total += row.total;
      }
    });
    setTotalMontant(total);
  }, [data]);

  return (
    <div className="facturation">
      <table id='table-data'>
        <thead>
          <tr>
            <th>N°</th>
            <th>Locataire</th>
            <th>N° Telephone</th>
            <th>Ancien Index</th>
            <th>Nouvel Index</th>
            <th>quantité </th>
            <th>Qwt</th>
            <th>Gardinage</th>
            <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
            <tr key={index}>
            <td>{row.numero_chambre}</td>
            <td>{row.locataire}</td>
            <td>{row.telephone}</td>
            <td>{row.ancienIndex}</td>
            <td>
            <input
            type="number"
            value={row.newIndex || ''}
            onChange={(e) => handleNewIndexChange(row, e.target.value)}
            />
            </td>
            <td>{row.quantite}</td>
            <td>125</td>
            <td>2000</td>
            <td><b>{row.total}</b></td>
            </tr>
            ))}
            </tbody>
            <tfoot>
            <tr>
            <td colSpan="8"> <b> Montant total: </b></td>
            <td><b>{totalMontant}</b></td>
            </tr>
            </tfoot>
            </table>
            <div className='fontbouton'>
              <button onClick={saveData}>Enregistrer</button>
              <button onClick={handleDownload}>Télécharger en PDF</button>
            </div>
            </div>
);
}