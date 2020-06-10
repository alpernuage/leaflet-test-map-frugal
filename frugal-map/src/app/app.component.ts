// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Implémenter OnInit
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  // Fonction d'initialisation du composant.
  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([50.6311634, 3.0599573], 12);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    this.http.get('https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=bornes-podotactiles').subscribe((data: any) => {
      data.records.forEach(podotactile => {
        L.marker([podotactile.geometry.coordinates[1], podotactile.geometry.coordinates[0]], { icon: myIcon }).addTo(myfrugalmap);
      });
    });

    // L.marker([50.6311634, 3.0599573], { icon: myIcon }).bindPopup('Je suis un Frugal Marqueur').addTo(myfrugalmap).openPopup();

    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //   attribution: 'Frugal Map'
    // }).addTo(myfrugalmap);
  }
}