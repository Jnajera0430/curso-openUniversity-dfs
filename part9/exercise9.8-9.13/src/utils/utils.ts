import { GenderType, NewPatientEntry } from "../types/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is GenderType => {
  return Object.values(GenderType)
    .map((v) => v.toString())
    .includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorret or missing name: " + name);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown) => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing dateOfBirth: " + dateOfBirth);
  }

  return dateOfBirth;
};

const parseGender = (gender: unknown): GenderType => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing dateOfBirth: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown) => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing dateOfBirth: " + occupation);
  }

  return occupation;
};

const parseSsn = (ssn: unknown) => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing dateOfBirth: " + ssn);
  }

  return ssn;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
    };
    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};
