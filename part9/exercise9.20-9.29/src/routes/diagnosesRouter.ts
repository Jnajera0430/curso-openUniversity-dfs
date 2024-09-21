import { Router } from "express";
import diagnoseServices from "../services/diagnoseServices";

const diagnosesRouter = Router();
diagnosesRouter.get("/", (_req, res) => {
  const diagnoses = diagnoseServices.getAllDiagnose();
  return res.json(diagnoses);
});

export default diagnosesRouter;
