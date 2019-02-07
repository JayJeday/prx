import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "src/environments/environment";
import { Web,sp, spODataEntity, Item } from '@pnp/sp';
import { Observable, Subject } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

const web = new Web(environment.web);

@Injectable({
    providedIn: 'root'
})

export class Docset{

    constructor(private http: Http){

    }
//
    getDocSet(){
        return Observable.fromPromise(web.lists.getByTitle('Enrollment Program').expand("Folders","Files","ListItemAllFields").items.get())
    .pipe(map((data:any)=>{
        return data;
    })); 
    }

    

}