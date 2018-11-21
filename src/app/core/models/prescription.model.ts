import { Status } from "./status.model";
import { Patient } from "./patient.model";
import { Doctor } from "./doctor.model";

export interface Prescription{
    Description?:string;
    Status?:Status;
    Patient?:Patient;
    Doctor?:Doctor;
}