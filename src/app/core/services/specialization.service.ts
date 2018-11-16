import { Injectable } from '@angular/core';

import { Http } from "@angular/http";
import { environment } from "src/environments/environment";

import { Web,sp, spODataEntity, Item } from '@pnp/sp';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Specialization } from '../models/specialization.model';

const web = new Web(environment.web);


@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http: Http) { }

  getSpecializations(){
    return Observable.fromPromise(web.lists.getByTitle("Specializations").items.get())
    .pipe(map((data:any)=>{
        return data as Specialization[];
    }));    
}


}
