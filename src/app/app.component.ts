import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Docset } from './core/services/docset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PharmacyRx';

  constructor(private router: Router
    ){}

}
