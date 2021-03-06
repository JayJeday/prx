import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "src/environments/environment";

import { Web,sp, spODataEntity, Item } from '@pnp/sp';
import { Observable, Subject } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Doctor } from "../models/doctor.model";

const web = new Web(environment.web);


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctSubject = new Subject<Doctor>();

  constructor(private http: Http) { }

  getDoctors(){
    return Observable.fromPromise(web.lists.getByTitle("Doctors").items.get())
    .pipe(map((data:any)=>{
        return data as Doctor[];
    }));    
}

getDoctorById(id:number){
  return Observable.fromPromise(web.lists.getByTitle("Doctors").items.getById(id)
  .select("ID","FirstName","LastName","license", "Specialization/Specialty").expand("Specialization")
  .get());

}


getDoctorByLicense(filterQuery:string){
  
 return Observable.fromPromise(web.lists.getByTitle("Doctors").items.filter(filterQuery).get());

}

//verify if patient exist
verifyDoctor(filterQuery:string){
  return Observable.fromPromise(web.lists.getByTitle("Doctors").items.filter(filterQuery).get()).subscribe((data:any)=>{
  
    this.doctSubject.next(data);

  });
}


}
