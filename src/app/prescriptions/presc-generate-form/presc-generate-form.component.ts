import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-presc-generate-form',
  templateUrl: './presc-generate-form.component.html',
  styleUrls: ['./presc-generate-form.component.css']
})
export class PrescGenerateFormComponent implements OnInit {

  patientFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.patientFormGroup = this._formBuilder.group({
      FirstName: ['', Validators.required],
       LastName: ['', Validators.required],
       Telephone: ['', Validators.required]
    });

  }

}
