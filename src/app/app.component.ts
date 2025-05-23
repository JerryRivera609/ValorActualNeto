import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent { 
  inversionInicial: number = 0;
  tasaDescuento: number = 0;
  flujosCaja: number[] = [0]; // Comienza con 1 año
  resultadoVan: number = 0;
  moneda: string = '$';

  calcularVAN(): void {
    if (
      this.inversionInicial == null ||
      this.tasaDescuento == null ||
      this.flujosCaja.length === 0
    ) {
      this.resultadoVan = 0;
      return;
    }

    const tasa = this.tasaDescuento / 100;
    let van = -this.inversionInicial;

    this.flujosCaja.forEach((flujo, index) => {
      const año = index + 1;
      van += flujo / Math.pow(1 + tasa, año);
    });

    this.resultadoVan = parseFloat(van.toFixed(2));
  }


  quitarFlujoCaja(index: number): void {
    if (this.flujosCaja.length > 1) {
      this.flujosCaja.splice(index, 1);
    }
  }
  agregarFlujoCaja(): void {
    this.flujosCaja.push(0);
  }
}