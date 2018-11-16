import { Injectable } from '@angular/core';

import { Http } from "@angular/http";
import { environment } from "src/environments/environment";

import { Web} from '@pnp/sp';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Medicaments } from '../models/medicaments.model';

const web = new Web(environment.web);

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  constructor(private http: Http) { }

  getMedications(){
    return Observable.fromPromise(web.lists.getByTitle("Medicaments").items.get())
    .pipe(map((data:any)=>{
        return data as Medicaments[];
    }));    
}
}
