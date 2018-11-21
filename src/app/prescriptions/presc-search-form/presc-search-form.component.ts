import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { StatusService } from 'src/app/core/services/status.service';
import { Status } from 'src/app/core/models/status.model';
import { Prescription } from 'src/app/core/models/prescription.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-presc-search-form',
  templateUrl: './presc-search-form.component.html',
  styleUrls: ['./presc-search-form.component.css']
})
export class PrescSearchFormComponent implements OnInit {

  prescForm: FormGroup;
  loaded: boolean = false;
  loading: boolean = false;
  statusList:Status[];
  queryFilter:string  = "";

  prescriptions:Prescription[] = [];

  prescData: MatTableDataSource<any>;

//columns
displayedColumns: string[] = ['ID', 'Description', 'PatientName', 'PatientLastName','status','doctor', 'actions'];

  constructor(private prescService:PrescriptionService,
          private statusService: StatusService) { }

  ngOnInit() {

    this.statusService.getStatus().subscribe((data:any)=>{
      this.statusList = data;

      console.log(this.statusList);
    });

    this.prescForm = new FormGroup({
    'FirstName': new FormControl(null),
    'LastName': new FormControl(null),
    'telephone': new FormControl(null),
    'status': new FormControl(null),
    'DoctorName': new FormControl(null)
  });


  }
  
  get f() { return this.prescForm.controls; }

  searchForm(){

    this.loading = true;
   
    for (var key in this.prescForm.value) {

      if (this.prescForm.value[key] !== null && this.prescForm.value[key] !== "") {

        var filter = key + " eq " + this.prescForm.value[key] + " ";

        this.queryFilter += filter;

      } 
    }

    this.prescService.getSearchedPrescription(this.queryFilter).subscribe((data)=>
    {
      this.loading = false;
      //display the table
      this.loaded = true;

      this.prescriptions = data;

      this.prescData = new MatTableDataSource(this.prescriptions);

    },((error)=>{
      console.log(error);
      this.loading = false;
    })
    
    );

    this.queryFilter = "";
  }

}
