import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Web,sp, spODataEntity, Item } from '@pnp/sp';
import { Observable, Subject } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';

const web = new Web(environment.web);

@Injectable({
  providedIn: 'root'
})
export class PatientMedService {

    addPatientMed(patientMed){
        return Observable.fromPromise(web.lists.getByTitle("PatientMeds").items.add(patientMed));
    }

    
}