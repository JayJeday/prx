import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { StatusService } from 'src/app/core/services/status.service';
import { Prescription } from 'src/app/core/models/prescription.model';
import { Patient } from 'src/app/core/models/patient.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { MedicationsService } from 'src/app/core/services/medications.service';
import { Medicaments } from 'src/app/core/models/medicaments.model';
import { PatientMedService } from 'src/app/core/services/patientmed.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-presc-insert-form',
  templateUrl: './presc-insert-form.component.html',
  styleUrls: ['./presc-insert-form.component.css']
})
export class PrescInsertFormComponent implements OnInit {

  medicament:Medicaments;
  medicamentList:Medicaments[] = [];

  key:string;
  patient:Patient = {} as Patient;
  doctor:Doctor;
  prescription:Prescription = {} as Prescription;
  filename:string;

  submitLoading:boolean;

  medNotExist:boolean;
  patNotExist:boolean;
  docNotExist:boolean;

  dataLoaded:boolean;
  loading:boolean;

  @ViewChild('fileName')
  fileInputVariable: ElementRef;

  formGroup = new FormGroup({
    'file': new FormControl(null, Validators.required)
  });

  constructor(
    private cd: ChangeDetectorRef,
     private prescService:PrescriptionService,
     public patientService:PatientService,
     private doctorService:DoctorService,
     public snackBar: MatSnackBar,
     private medicationService:MedicationsService,
     private patientmedService:PatientMedService
     ) {}

  ngOnInit() {

    //validation here
    this.medicationService.medSubject.subscribe((data:any)=>{
      console.log(data);

      this.medicament = data[0];
      this.medicamentList.push(this.medicament);
      console.log(this.medicamentList);

      if(data.length !== 0){
        console.log('medicament exist');
        this.medNotExist = false;  
      }else{
        console.log('medicament does not exist');
        this.medNotExist = true;
      }

    });

    this.patientService.patSubject.subscribe((data:any)=>{

      this.patient = data[0];
      
      if(data.length !== 0){
        console.log('patient exist');
        this.patNotExist = false;  
      }else{
        console.log('patient does not exist');
        this.patNotExist = true;
      }
    });

    this.doctorService.doctSubject.subscribe((data:any)=>{

      this.doctor = data[0];
      console.log(this.doctor);

      if(data.length !== 0){
        console.log('doctor exist');
        this.docNotExist = false;  
      }else{
        console.log('doctor does not exist');
        this.docNotExist = true;
      }

      this.loading = false;
    });
  }

  get f() { return this.formGroup.controls; }

  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      
      //represent file informations
      const [file] = event.target.files;
      this.filename = file.name;

      //set the reader to read the content of the file as text
      reader.readAsText(file);
      
      //when file is loaded this observer will execute
      reader.onload = (e) => {
        
        this.loading = true;

        this.formGroup.patchValue({
          file: reader.result
        });
        
        this.readPrescFileToLoad(reader.result);
        
        //data loaded 
        this.dataLoaded = true;
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
     
    }
  }

/*
  Reading prescription file 
*/
  readPrescFileToLoad(reader){
    //split the string 
    let prescriptionFields = reader.split(',');

    this.manageMeds(prescriptionFields[3]);

    console.log(prescriptionFields);
    
    prescriptionFields.forEach(element => {
      
     this.key =  element.substr(0,element.indexOf(' ')); 
     let value = element.substr(element.indexOf(' ')+1);


     switch (this.key.trim()) {
      // validate the patient by his phone number
       case 'Telephone':
      let filter = `Telephone eq '${value}'`;

        //validate if patient exist
         this.patientService.verifyPatient(filter);

         break;
      
        
        case 'license':   

        //  validate doctor by his license
        this.doctorService.verifyDoctor(`license eq '${value}'`);
        
       default:
         break;
     }

    });
  }
/*
  manage med part of the file
*/
manageMeds(medsPart:string){

  //need to substring the medication header part
  let stri = medsPart.substr(medsPart.indexOf('--')+2);

  // split string by --
  let meds = stri.split('--');

  console.log(meds);

  meds.forEach( (med)=>{

    let value = med.substr(med.indexOf(':')+1);

    let brandValue = value.substr(0,value.indexOf(' '));
    let orientationTypeValue = value.substr(value.indexOf(':')+1);

    //validate if med is in base
    this.isMedInBase(brandValue,orientationTypeValue);

  });
}

 async isMedInBase(brand, orientation){
  let filter = `Brand eq '${brand}' and  OrientationType eq '${orientation}'`;
  
  //validate med
  this.medicationService.validateMed(filter);

}

/*

submit insert prescription along with patient med and file

*/
  onSubmit(){
    this.submitLoading = true;
    this.prescService.addPrescription({PatientId:this.patient.ID,DoctorId:this.doctor.ID,statusId:1},this.filename,this.formGroup.value.file,).subscribe((data)=>{
        console.log(data);
        this.medicamentList.forEach(element => {
          this.patientmedService.addPatientMed({MedicamentId:element.ID,PatientsId:this.patient.ID,PrescriptionId:data})
          .subscribe((data:any)=>{

            this.submitLoading = false;
            this.formGroup.reset();
            this.fileInputVariable.nativeElement.value = "";
            this.dataLoaded = false;
            this.resetData();

            //display validation message
            this.snackBar.open("Inserted successfully",'', {
              duration: 1000
            });
          },(error)=>{
            console.log(error);
            this.submitLoading = false;
          });
        });

    },(err)=>{
      console.log(err);
      this.submitLoading = false;
    });

  }


  resetData(){
    this.patient = null;
    this.doctor = null;
    this.medicament = null;
    this.medicamentList = null;
  }

}
{}