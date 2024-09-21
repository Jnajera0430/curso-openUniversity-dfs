import dataPatients from "../data/patients";
import { Patient, NonSensitivePatient, EntryWithoutId } from "../types/types";
import { v4 as uuid } from "uuid";

const getAllPatients = (): NonSensitivePatient[] => {
  return dataPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getOnePatient = (id: string) => {
  const patientFound = dataPatients.find((patient) => patient.id === id);
  if (!patientFound) {
    throw new Error("Patient not found.");
  }

  return patientFound;
};

const addPatient = (patient: Patient) => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  dataPatients.push(newPatient);

  return newPatient;
};

const addEntryOfPatient = (entryPatient: EntryWithoutId, idPatient: string) => {
  const newEntryOfPatient = {
    id: uuid(),
    ...entryPatient,
  };

  const patientFound = dataPatients.find((patient) => patient.id === idPatient);
  if (!patientFound) {
    throw new Error("Patient not found.");
  }
  patientFound.entries.push(newEntryOfPatient);
  return newEntryOfPatient;
};

export default {
  getAllPatients,
  addPatient,
  getOnePatient,
  addEntryOfPatient,
};
