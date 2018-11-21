import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-presc-detail',
  templateUrl: './presc-detail.component.html',
  styleUrls: ['./presc-detail.component.css']
})
export class PrescDetailComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<PrescDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { } 

  ngOnInit() {
    
  }

}
