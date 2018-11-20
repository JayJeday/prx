import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Web,sp, spODataEntity, Item } from '@pnp/sp';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';


const web = new Web(environment.web);

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: Http) { }

  getPatients(){
    return Observable.fromPromise(web.lists.getByTitle("Patients").items.get())
    .pipe(map((data:any)=>{

        return data as Patient[];
   
      }));    

}

}
