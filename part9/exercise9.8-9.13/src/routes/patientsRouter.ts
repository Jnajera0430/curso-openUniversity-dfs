import { Router } from "express";
import patientServices from "../services/patientServices";
import { toNewPatientEntry } from "../utils/utils";
const patientRouter = Router();

patientRouter.get("/", (_req, res) => {
  const patients = patientServices.getAllPatients();
  return res.json(patients);
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
    return res.status(400).send(errorMessage);
  }
});

export default patientRouter;
