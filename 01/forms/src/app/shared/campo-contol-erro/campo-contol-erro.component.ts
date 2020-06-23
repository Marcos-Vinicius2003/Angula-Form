import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-contol-erro',
  templateUrl: './campo-contol-erro.component.html',
  styleUrls: ['./campo-contol-erro.component.css']
})
export class CampoControlErroComponent implements OnInit {

  @Input() mostrarErro: boolean;
  @Input() msgErro: string;

  constructor() { }

  ngOnInit() {
  }

}
