import React from "react";

export default function home(){
    return (
        <section className="widgets">
          <div className="widget">
            <h2>Nombre de chambre</h2>
            <p>Total occupe 10.</p>
          </div>
          <div className="widget">
            <h2>Nombre de studio </h2>
            <p>Total Occupé 10.</p>
          </div>
          <div className="widget">
            <h2>Nombre d'appartement</h2>
            <p>Total Occupé 10.</p>
          </div>
          <div className="widget">
            <h2>Loyer en retard</h2>
            <p>10.</p>
          </div>
          <div className="widget">
            <h2>Facture non confirmé</h2>
            <p>10.</p>
          </div>
        </section>
    );
}