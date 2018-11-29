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
export class PatientService {

  patSubject = new Subject<Patient>();

  constructor(private http: Http) { }

  getPatients(){
    return Observable.fromPromise(web.lists.getByTitle("Patients").items.get())
    .pipe(map((data:any)=>{

        return data as Patient[];
   
      }));    
}

//verify if patient exist
  verifyPatient(filterQuery:string){

    return Observable.fromPromise(web.lists.getByTitle("Patients").items.filter(filterQuery).get())
    .subscribe((data:any)=>{

      this.patSubject.next(data);

    });
}


}
