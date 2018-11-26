import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Prescription } from '../core/models/prescription.model';
import { PrescriptionService } from '../core/services/prescription.service';
import { MatDialog } from '@angular/material';
import { PrescDetailComponent } from './presc-detail/presc-detail.component';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {

  prescriptions:Prescription[] = [];

  prescData: MatTableDataSource<any>;

  //columns
  displayedColumns: string[] = ['ID', 'Description', 'PatientName', 'PatientLastName','status','doctor', 'actions'];

  constructor(private prescService:PrescriptionService,
    private dialog: MatDialog) { }

  ngOnInit() {

    this.prescService.getPrescriptions().subscribe((data)=>{
      
      this.prescriptions = data;
     
      console.log(this.prescriptions[0].Doctor.FirstName);

      this.prescData = new MatTableDataSource(this.prescriptions);

    });

  }

  onViewTest(){
    
  }
  
  onViewPresc(row){
    const dialogRef = this.dialog.open(PrescDetailComponent, {
      width: '60%',
      data:{id:row}
   });
   return false;
  }

}
