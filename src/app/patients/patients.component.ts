import { Component, OnInit } from '@angular/core';
import { Patient } from '../core/models/patient.model';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../core/services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients:Patient[] = [];

  patientData: MatTableDataSource<any>;

  //columns
  displayedColumns: string[] = ['ID', 'FirstName', 'LastName', 'Telephone', 'actions'];

  constructor(private patientService:PatientService) { }

  ngOnInit() {

    this.patientService.getPatients().subscribe((data:any)=>{
      this.patients = data;
      this.patientData = new MatTableDataSource(this.patients); 
    });

    

  }

}
