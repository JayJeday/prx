import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Docset } from '../core/services/docset';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // animation triggers go here
   trigger('openClose',[

     state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),

    state('closed', style({
      height: '100px',
      opacity: 0.5,
      backgroundColor: 'green'
    })),
    
    //transition between states
    transition('open => closed', [
      animate('1s')
    ]),

    transition('closed => open', [
      animate('0.5s')
    ]),

    ])
  ]
   
})
export class HomeComponent implements OnInit {

  activate:boolean = false;

  constructor(private docSetService: Docset) { }

  ngOnInit() {
    this.docSetService.getDocSet().subscribe((data:any)=>{

      console.log(data);

    });
  }

  someAction(){
    return false;
  }

}
