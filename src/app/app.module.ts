import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { DoctorsComponent } from './doctors/doctors/doctors.component';
import { RouterModule } from '@angular/router';
import { DoctorService } from './core/services/doctor.service';
import { MedicationsService } from './core/services/medications.service';
import { PatientService } from './core/services/patient.service';
import { PrescriptionService } from './core/services/prescription.service';
import { SpecializationService } from './core/services/specialization.service';
import { StatusService } from './core/services/status.service';


@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [DoctorService,
    MedicationsService,
    PatientService,
    PrescriptionService,
    SpecializationService,
    StatusService,
    {provide: APP_BASE_HREF, useValue : '/sites/sharestack/JC-site/Pages/default.aspx'}],
  bootstrap: [AppComponent]
})


export class AppModule { }
