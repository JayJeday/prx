import { Status } from "./status.model";
import { Patient } from "./patient.model";
import { Doctor } from "./doctor.model";

export interface Prescription{
    description?:string;
    status?:Status;
    patient?:Patient;
    doctor?:Doctor;
}