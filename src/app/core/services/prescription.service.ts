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

   return Observable.fromPromise(web.lists.getByTitle("Prescription").items
   .select("ID","Description","Doctor/LastName","status/Title","Patient/FirstName","Patient/LastName")
   .expand("Doctor","status","Patient").get());
  }

  getSearchedPrescription(filterQuery:string){
    
    return Observable.fromPromise(web.lists.getByTitle("Prescription").items.filter(filterQuery)
    .select("ID","Description","Doctor/LastName","status/Title","Patient/FirstName","Patient/LastName")
    .expand("Doctor","status","Patient").get());
  
  }

  getPrescriptionById(id:number){

    return Observable.fromPromise(web.lists.getByTitle("Prescription").items.getById(id)
    .select("ID","Description","Doctor/LastName","status/Title","Patient/FirstName","Patient/LastName")
    .expand("Doctor","status","Patient").get());
    
  }

  //attach prescription
  setPrescFile(id:number,filename:string,content:string | Blob | ArrayBuffer){

    let item = web.lists.getByTitle("Prescription").items.getById(id);

    return Observable.fromPromise(item.attachmentFiles.add(filename, content));

  }
  
  getPrescFile(id:number){

    let item = web.lists.getByTitle("Prescription").items.getById(id);

    return Observable.fromPromise(item.attachmentFiles.get());

  }


  getFileToSharepoint(path:string){

    //input temporary memory
    let input = <HTMLInputElement>document.getElementById("thefileinput");
    let file = input.files[0];

    //verify if file is < 10mb
    if(file.size > 10485760){

    return Observable.fromPromise(web.getFolderByServerRelativeUrl(path).files.add(file.name,file,true));

    }else{

        //file is over 10mb
        return Observable.fromPromise(web.getFolderByServerRelativeUrl(path).files.addChunked(file.name,file,data =>{
        
       
    },true));

    }

}
  
}
