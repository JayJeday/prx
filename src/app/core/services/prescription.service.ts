import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Web,sp, spODataEntity, Item } from '@pnp/sp';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Prescription } from '../models/prescription.model';

const web = new Web(environment.web);


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private http:Http) { }

  getPrescriptions(){

    /*
   
    return Observable.fromPromise(web.lists.getByTitle("Prescription").items.get())
    .pipe(map((data:any)=>{
        return data as Prescription[];
    })); 

    */

   return Observable.fromPromise(web.lists.getByTitle("Tickets").items
   .select("Doctor/FirstName").expand("DoctorID").get());

}

}
