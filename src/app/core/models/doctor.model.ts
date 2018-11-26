import { Specialization } from "./specialization.model";

export interface Doctor{
    ID?:number;
    FirstName?:string;
    LastName?:string;
    license?:string;
    Specialization?:Specialization;
}