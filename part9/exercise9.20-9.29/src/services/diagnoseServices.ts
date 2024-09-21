import diagnodeData from "../data/diagnoses";
import { Diagnose } from "../types/types";

const diagnoseList: Diagnose[] = diagnodeData;

const getAllDiagnose = (): Diagnose[] => {
  return diagnoseList;
};

export default {
  getAllDiagnose,
};
