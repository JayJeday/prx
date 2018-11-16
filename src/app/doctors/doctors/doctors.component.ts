import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { Doctor } from 'src/app/core/models/doctor.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors:Doctor[];

  constructor(private doctorService:DoctorService) { }

  ngOnInit() {
    
    this.doctorService.getDoctors().subscribe(
      (data)=>{
        this.doctors = data;
       },error =>{
        console.log(error)
    });

  }

}
