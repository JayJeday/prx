import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientService } from 'src/app/core/services/patient.service';
import { MedicationsService } from 'src/app/core/services/medications.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Medicaments } from 'src/app/core/models/medicaments.model';
import * as FileSaver from 'file-saver';
import { DoctorService } from 'src/app/core/services/doctor.service';

@Component({
  selector: 'app-presc-generate-form',
  templateUrl: './presc-generate-form.component.html',
  styleUrls: ['./presc-generate-form.component.css']
})
export class PrescGenerateFormComponent implements OnInit {

  patientFormGroup: FormGroup;
  loading:boolean;
  success:boolean;
  
  //for med table
  medications:Medicaments[];

  medData: MatTableDataSource<any>;

  selection = new SelectionModel<Medicaments>(true, []);


  //columns
  displayedColumns: string[] = ['select','ID', 'Brand', 'Description', 'OrientationType'];

  //data to validate
  patient:Patient;
  medicaments:Medicaments[];

  constructor(private _formBuilder: FormBuilder,
    private patientService:PatientService,
    private medicamentService:MedicationsService,
    private doctorService:DoctorService
    ) { }

  ngOnInit() {

    this.patientFormGroup = this._formBuilder.group({
       Telephone: ['', Validators.required],
       DoctorLicense: ['',Validators.required],
       Description: ['',Validators.required]
    });

    this.medicamentService.getMedications().subscribe((data)=>{
      console.log(data);
      this.medications = data;
      this.medData = new MatTableDataSource(this.medications); 
    });

  }

getMedicaments(medicaments){

  medicaments.forEach(element => {
    console.log(element);
  });
}

  get f() { return this.patientFormGroup.controls; }

  //make a fork join
  validateCalls(){

      //telephone part
      let telephone =  this.patientFormGroup.value.Telephone;
      
      let filter = `Telephone eq '${telephone}'`;
      this.patientService.getPatientByTelephone(filter);


      //license part
      let license = this.patientFormGroup.value.DoctorLicense;
      
      let filterLicense = `license eq '${license}'`;

      this.doctorService.getDoctorByLicense(filterLicense);
            


      console.log(this.selection);

      //get medication calls
      if(this.selection.selected.length === 0){
        this.success = false;
      }


    }

    //Generate content of the file
  generateContent():string{
    return "test on how to break line '\n' after this line '\n' and after the other line.";
  }

  generateFile(){
   // this.validateCalls();
    let line = this.generateContent();
    var blob = new Blob([line], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "hello world.txt");

  }

// table functionalities
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

  resetData(){
    this.selection.clear();
    this.patientFormGroup.reset();
  }
}
