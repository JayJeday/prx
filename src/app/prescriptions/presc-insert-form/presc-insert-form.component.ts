import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { StatusService } from 'src/app/core/services/status.service';
import { Prescription } from 'src/app/core/models/prescription.model';
import { Patient } from 'src/app/core/models/patient.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { MedicationsService } from 'src/app/core/services/medications.service';
import { Medicaments } from 'src/app/core/models/medicaments.model';

@Component({
  selector: 'app-presc-insert-form',
  templateUrl: './presc-insert-form.component.html',
  styleUrls: ['./presc-insert-form.component.css']
})
export class PrescInsertFormComponent implements OnInit {

  medicament:Medicaments;
  key:string;
  patient:Patient;
  doctor:Doctor;
  prescription:Prescription = {} as Prescription;
  filename:string;

  dataLoaded:boolean;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,private cd: ChangeDetectorRef,
     private prescService:PrescriptionService,
     public patientService:PatientService,
     private doctorService:DoctorService,
     private medicationService:MedicationsService
     ) {}

  ngOnInit() {

  }


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
   
         this.patientService.verifyPatient(filter).subscribe((data)=>{
          this.patient = data[0];   
        });
         break;
      
         //  validate doctor by his license
        case 'license':   
       
        this.doctorService.verifyDoctor(`license eq '${value}'`).subscribe((data)=>{
          this.doctor = data[0];
        });
        
       default:
         break;
     }

    });
  }

manageMeds(medsPart:string){

  let meds = medsPart.split('--');

  meds.forEach(async (med)=>{

    let value = med.substr(med.indexOf(':')+1);

    let brandValue = value.substr(0,value.indexOf(' '));
    let orientationTypeValue = value.substr(value.indexOf(':')+1);

    //validate if med is in base
   this.isMedInBase(brandValue,orientationTypeValue);

  });
}

 async isMedInBase(brand, orientation){
  let filter = `Brand eq '${brand}' and  OrientationType eq '${orientation}'`;
  
  this.medicationService.validateMed(filter);

  this.medicationService.medSubject.subscribe((data)=>{

    console.log(data);

  });
}

/*
submit insert prescription along with patient med
*/
  onSubmit(){

    this.prescService.addPrescription({PatientId:this.patient.ID,DoctorId:this.doctor.ID,statusId:1},this.filename,this.formGroup.value.file,).subscribe((data)=>{
        console.log("successfull entry");
    },(err)=>{
      console.log(err);
    });
  }


}
