import { Injectable } from '@angular/core';

import { Http } from "@angular/http";
import { environment } from "src/environments/environment";

import { Web} from '@pnp/sp';
import { Observable, Subject } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Medicaments } from '../models/medicaments.model';

const web = new Web(environment.web);

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  medSubject = new Subject<Medicaments>();

  constructor(private http: Http) { }

  getMedications(){
    return Observable.fromPromise(web.lists.getByTitle("Medicaments").items.get())
    .pipe(map((data:any)=>{
        return data as Medicaments[];
    }));    
}

  async validateMed(filterQuery){
    
    return Observable.fromPromise(web.lists.getByTitle("Medicaments").items.filter(filterQuery).get())
    .subscribe((data:any)=>{
      
      this.medSubject.next(data);

    });
  }


  
}
