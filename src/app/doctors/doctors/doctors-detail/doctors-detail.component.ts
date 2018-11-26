import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { Doctor } from 'src/app/core/models/doctor.model';


@Component({
  selector: 'app-doctors-detail',
  templateUrl: './doctors-detail.component.html',
  styleUrls: ['./doctors-detail.component.css']
})
export class DoctorsDetailComponent implements OnInit {

  doctor:Doctor;

  constructor(public dialogRef: MatDialogRef<DoctorsDetailComponent>,
    private doctorService:DoctorService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.doctorService.getDoctorById(this.data.id).subscribe((data)=>{
      console.log(data);
      
        this.doctor = data;
    });

  }

}
