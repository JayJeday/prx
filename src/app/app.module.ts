import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { DoctorsComponent } from './doctors/doctors/doctors.component';
import { RouterModule } from '@angular/router';
import { DoctorService } from './core/services/doctor.service';
import { MedicationsService } from './core/services/medications.service';
import { PatientService } from './core/services/patient.service';
import { PrescriptionService } from './core/services/prescription.service';
import { SpecializationService } from './core/services/specialization.service';
import { StatusService } from './core/services/status.service';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { HomeComponent } from './home/home.component';
import { MedicationsComponent } from './medications/medications.component';
import { PatientsComponent } from './patients/patients.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { PrescSearchFormComponent } from './prescriptions/presc-search-form/presc-search-form.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    HomeComponent,
    MedicationsComponent,
    PatientsComponent,
    PrescriptionsComponent,
    PrescSearchFormComponent,
    HeaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    AppMaterialModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
  ],
  providers: [
    DoctorService,
    MedicationsService,
    PatientService,
    PrescriptionService,
    SpecializationService,
    StatusService,
   {provide: APP_BASE_HREF, useValue : '/sites/sharestack/JC-site/Pages/default.aspx'}
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
