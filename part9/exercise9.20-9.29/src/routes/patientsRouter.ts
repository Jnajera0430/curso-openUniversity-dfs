import { Router } from "express";
import patientServices from "../services/patientServices";
import { toNewEntryOfPatient, toNewPatientEntry } from "../utils/utils";
const patientRouter = Router();

patientRouter.get("/", (_req, res) => {
  const patients = patientServices.getAllPatients();
  return res.json(patients);
});

patientRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientServices.getOnePatient(id);
  return res.json(patient);
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientServices.addPatient(newPatient);
    return res.status(201).json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).json(errorMessage);
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const newEntryOfPatientToCreate = toNewEntryOfPatient(req.body);
    const idPatient = req.params.id;

    const entryOfPatientCreated = patientServices.addEntryOfPatient(
      newEntryOfPatientToCreate,
      idPatient
    );

    return res.status(201).json(entryOfPatientCreated);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).json(errorMessage);
  }
});

export default patientRouter;
