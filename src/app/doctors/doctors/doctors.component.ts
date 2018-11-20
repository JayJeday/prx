import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { Doctor } from 'src/app/core/models/doctor.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors:Doctor[] = [];

  doctorData: MatTableDataSource<any>;

  //columns
displayedColumns: string[] = ['ID', 'FirstName', 'LastName', 'license', 'actions'];

  constructor(private doctorService:DoctorService,
    private dialog: MatDialog,
    ) { }

  ngOnInit() {

    this.doctorService.getDoctors().subscribe(
      (data)=>{
        this.doctors = data;
        this.doctorData = new MatTableDataSource(this.doctors);
       },error =>{
        console.log(error)
    });

    console.log(this.doctors);  
  }

onEdit(row){

}

}
