import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "src/environments/environment";

import { Web,sp, spODataEntity, Item } from '@pnp/sp';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Status } from "../models/status.model";

const web = new Web(environment.web);


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: Http) { }

  getStatus(){
    return Observable.fromPromise(web.lists.getByTitle("Status").items.get())
    .pipe(map((data:any)=>{
        return data as Status[];
    }));    
}

}