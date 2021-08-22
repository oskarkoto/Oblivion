import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  slides: { id: number;img: string}[] = [
    { id: 1,
      img: '/assets/img/gif.gif'}
    ,
    { id: 2,
      img: '/assets/img/inicio/habitacion_inicio.jpg'}
    ,
    { id: 3,
      img: '/assets/img/inicio/privado_inicio.jpg'}
    ];
  constructor() {}

}
