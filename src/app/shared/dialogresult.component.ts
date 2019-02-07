import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'app-dialog-result',
    templateUrl: './success.dialog.html'
  })
  export class DialogResultComponent implements OnInit {
    

   constructor(public dialogRef: MatDialogRef<DialogResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){

   }

    ngOnInit( ): void {
       
    }

    closeDialog(){
        this.dialogRef.close();
      }

  }