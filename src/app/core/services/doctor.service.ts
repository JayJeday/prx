import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "src/environments/environment";

import { Web,sp, spODataEntity, Item } from '@pnp/sp';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Status } from "../models/status.model";
import { Doctor } from "../models/doctor.model";

const web = new Web(environment.web);


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: Http) { }

  getDoctors(){
    return Observable.fromPromise(web.lists.getByTitle("Doctors").items.get())
    .pipe(map((data:any)=>{
        return data as Doctor[];
    }));    
}

}
