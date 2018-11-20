import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { StatusService } from 'src/app/core/services/status.service';
import { Status } from 'src/app/core/models/status.model';

@Component({
  selector: 'app-presc-search-form',
  templateUrl: './presc-search-form.component.html',
  styleUrls: ['./presc-search-form.component.css']
})
export class PrescSearchFormComponent implements OnInit {

  prescForm: FormGroup;
  success: boolean;
  statusList:Status[];

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
    'StatusId': new FormControl(null),
    'DoctorName': new FormControl(null)
  });


  }
  
  searchForm(){

    
  }

}
