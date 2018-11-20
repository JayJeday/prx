import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { MedicationsComponent } from './medications/medications.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';

const routes: Routes = [
  {
    path:'doctors', 
    component:DoctorsComponent
  },
  {
    path:'patients',
    component:PatientsComponent
  },
  {
    path:'medications',
    component:MedicationsComponent
  },
  {
    path:'prescriptions',
    component:PrescriptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
