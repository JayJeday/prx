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
import { Doctor } from 'src/app/core/models/doctor.model';

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

  doctor:Doctor = {} as Doctor;
  //data to validate
  patient:Patient = {} as Patient;
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
       Description: ['']
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

    console.log(this.selection);

      //get medication calls
      if(this.selection.selected.length === 0){
        this.success = false;
      }
    }

    //Generate content of the file
  generateContent():string{
    let content = "test on how to break line \n after this line \n and after the other line.";
    return content;
  }

  patientEv(){

   // console.log("next event");
   let telephone =  this.patientFormGroup.value.Telephone;
      
   let filter = `Telephone eq '${telephone}'`;

   this.patientService.getPatientByTelephone(filter).subscribe((data:any)=>{
     if(data.length === 0){
       //if data is empty set patient to null
       this.patient = null;
     }else{
        this.patient = data[0];
     }
   
   });

   //license part
   let license = this.patientFormGroup.value.DoctorLicense;
   
   let filterLicense = `license eq '${license}'`;

   this.doctorService.getDoctorByLicense(filterLicense).subscribe((data:any)=>{
        this.doctor = data[0];
   });

   console.log(this.doctor);
   console.log(this.patient);
  }

  generateFile(){
    this.validateCalls();
    
    let line = this.generateContent();
    var blob = new Blob([line], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "hello world.txt");

  }

  showData(){
    console.log(this.patient);
    console.log(this.doctor);
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
