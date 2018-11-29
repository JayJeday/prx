import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatChipsModule, MatCardModule,
   MatListModule, MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule, MatRadioModule, MatTabsModule,
    MatSidenavModule, MatPaginatorModule, MatTableModule, MatIconModule, MatSortModule, MatProgressBarModule, MatStepperModule} from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatRadioModule,
    MatTabsModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatProgressBarModule
  ],exports:[
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatRadioModule,
    MatTabsModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatProgressBarModule
  ],
  declarations: []
})
export class AppMaterialModule { }

