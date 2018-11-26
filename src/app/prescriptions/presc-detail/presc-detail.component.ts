import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { Prescription } from 'src/app/core/models/prescription.model';

@Component({
  selector: 'app-presc-detail',
  templateUrl: './presc-detail.component.html',
  styleUrls: ['./presc-detail.component.css']
})
export class PrescDetailComponent implements OnInit {

  prescription:Prescription = {} as Prescription ;

  constructor(public dialogRef: MatDialogRef<PrescDetailComponent>,
    private prescriptionService:PrescriptionService,
    @Inject(MAT_DIALOG_DATA) public data: any) { } 


  ngOnInit() {
   
     this.prescriptionService.getPrescriptionById(this.data.id).subscribe((data)=>{
        console.log(data);
        this.prescription = data;
      });
  }
}
