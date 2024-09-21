import {
  Diagnose,
  Discharge,
  EntryWithoutId,
  GenderType,
  HealthCheckRating,
  NewPatientEntry,
  SickLeave,
} from "../types/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return !isNaN(Number(num)) || num instanceof Number;
};

const isGender = (param: string): param is GenderType => {
  return Object.values(GenderType)
    .map((v) => v.toString())
    .includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorret or missing name: " + name);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown) => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing date: " + dateOfBirth);
  }

  return dateOfBirth;
};

const parseGender = (gender: unknown): GenderType => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
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
    throw new Error("Incorrect or missing ssn: " + ssn);
  }

  return ssn;
};

const parseDescription = (description: unknown) => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing decription: " + description);
  }
  return description;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

const parseSpecialist = (specialist: unknown) => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing ssn: " + specialist);
  }

  return specialist;
};

const parseTypeEntryOfPatient = (type: unknown) => {
  const types = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  if (!type || !isString(type) || !types.includes(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }

  return type as "HealthCheck" | "Hospital" | "OccupationalHealthcare";
};

const parseHealthCheckRating = (healthCheckRating: unknown) => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "value of healthCheckRating incorrect " + healthCheckRating
    );
  }

  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown) => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName: " + employerName);
  }

  return employerName;
};

const parseDischarge = (discharge: unknown) => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge");
  }
  if ("date" in discharge && "criteria" in discharge) {
    if (
      !discharge.date &&
      !isString(discharge.date) &&
      discharge.criteria &&
      !isString(discharge.criteria)
    ) {
      throw new Error("Incorrect or missing discharge");
    }
    return discharge as Discharge;
  }
  throw new Error("Incorrect or missing discharge");
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing sickLeave");
  }

  if (
    !("startDate" in sickLeave) ||
    !sickLeave.startDate ||
    !isString(sickLeave.startDate)
  ) {
    throw new Error("Incorrect or missing startDate");
  }
  if (
    !("endDate" in sickLeave) ||
    !sickLeave.endDate ||
    !isString(sickLeave.endDate)
  ) {
    throw new Error("Incorrect or missing endDate");
  }

  return sickLeave as SickLeave;
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
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: [],
    };
    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntryOfPatient = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }

  if (
    "date" in object &&
    "description" in object &&
    "type" in object &&
    "specialist" in object
  ) {
    const baseEntry = {
      date: parseDateOfBirth(object.date),
      description: parseDescription(object.description),
      type: parseTypeEntryOfPatient(object.type),
      specialist: parseSpecialist(object.specialist),
    };

    switch (baseEntry.type) {
      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error(
            "Incorrect or missing healthCheckRating for type: " + baseEntry.type
          );
        }
        return {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      case "Hospital":
        if (!("discharge" in object)) {
          throw new Error(
            "Incorrect or missing discharge for type: " + baseEntry.type
          );
        }
        return {
          ...baseEntry,
          type: "Hospital",
          discharge: parseDischarge(object.discharge),
        };
      case "OccupationalHealthcare":
        if (!("sickLeave" in object)) {
          throw new Error(
            "Incorrect or missing sickLeave for type: " + baseEntry.type
          );
        }

        if (!("employerName" in object)) {
          throw new Error(
            "Incorrect or missing employerName for type: " + baseEntry.type
          );
        }

        if (!("diagnosisCodes" in object)) {
          throw new Error(
            "Incorrect or missing diagnosisCodes for type" + baseEntry.type
          );
        }

        return {
          ...baseEntry,
          type: "OccupationalHealthcare",
          sickLeave: parseSickLeave(object.sickLeave),
          employerName: parseEmployerName(object.employerName),
          diagnosisCodes: parseDiagnosisCodes(object),
        };
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};
