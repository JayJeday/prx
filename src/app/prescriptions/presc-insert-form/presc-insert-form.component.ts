import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-presc-insert-form',
  templateUrl: './presc-insert-form.component.html',
  styleUrls: ['./presc-insert-form.component.css']
})
export class PrescInsertFormComponent implements OnInit {

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,private cd: ChangeDetectorRef) {}

  ngOnInit() {
  }


  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = (e) => {
        
        this.formGroup.patchValue({
          file: reader.result
        });
        

        console.log(reader.readAsText(file));

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}
