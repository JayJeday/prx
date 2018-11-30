import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Medicaments } from '../core/models/medicaments.model';
import { MedicationsService } from '../core/services/medications.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  medications:Medicaments[];

  medData: MatTableDataSource<any>;

  selection = new SelectionModel<Medicaments>(true, []);
  
  @Output() medSelected = new EventEmitter();

  //columns
  displayedColumns: string[] = ['select','ID', 'Brand', 'Description', 'OrientationType'];

  constructor(private serviceMedicaments:MedicationsService) { }

  ngOnInit() {

    this.serviceMedicaments.getMedications().subscribe((data)=>{
      console.log(data);
      this.medications = data;
      this.medData = new MatTableDataSource(this.medications); 
    });
      
  }

  applyFilter(filterValue: string) {
    this.medData.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.medData.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.medData.data.forEach(row => this.selection.select(row));
  }

  
  
}
