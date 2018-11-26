import { Status } from "./status.model";
import { Patient } from "./patient.model";
import { Doctor } from "./doctor.model";

export interface Prescription{
    Description?:string;
    status?:Status;
    Patient?:Patient;
    Doctor?:Doctor;
}