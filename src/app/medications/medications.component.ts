import { Component, OnInit } from '@angular/core';
import { Medicaments } from '../core/models/medicaments.model';
import { MedicationsService } from '../core/services/medications.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  medications:Medicaments[];

  medData: MatTableDataSource<any>;

  //columns
displayedColumns: string[] = ['ID', 'Brand', 'Description', 'OrientationType', 'actions'];

  constructor(private serviceMedicaments:MedicationsService) { }

  ngOnInit() {

    this.serviceMedicaments.getMedications().subscribe((data)=>{
      console.log(data);
      this.medications = data;
      this.medData = new MatTableDataSource(this.medications); 
    });

  }

}
