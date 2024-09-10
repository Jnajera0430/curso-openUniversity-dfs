export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum GenderType {
  male = "male",
  other = "other",
  female = "female",
}

export interface Patient {
  id?: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: GenderType;
  occupation: string;
}

export type PatiensWithoutSSN = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;
