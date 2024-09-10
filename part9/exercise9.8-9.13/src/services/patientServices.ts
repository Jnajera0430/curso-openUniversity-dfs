import dataPatients from "../data/patients";
import { Patient, PatiensWithoutSSN } from "../types/types";
import { v4 as uuid } from "uuid";
const patientsList: Patient[] = dataPatients as Patient[];

const getAllPatients = (): PatiensWithoutSSN[] => {
  return patientsList.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: Patient) => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patientsList.push(newPatient);

  return newPatient;
};

export default {
  getAllPatients,
  addPatient,
};
