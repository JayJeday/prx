import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Prescription } from '../core/models/prescription.model';
import { Http } from '@angular/http';
import { PrescriptionService } from '../core/services/prescription.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {

  prescriptions:Prescription[] = [];

  prescData: MatTableDataSource<any>;

  //columns
  displayedColumns: string[] = ['ID', 'Description', 'PatientName', 'PatientLastName','status', 'actions'];

  constructor(private prescService:PrescriptionService) { }

  ngOnInit() {

    this.prescService.getPrescriptions().subscribe((data)=>{
      
      console.log(data);
      
      this.prescriptions = data;
     
      this.prescData = new MatTableDataSource(this.prescriptions);

    });

  }

}
