import axios, { AxiosError } from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const createEntryOfPatient = async (
  idPatient: string,
  dataEntry: EntryWithoutId
) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${idPatient}/entries`,
      dataEntry
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};

export default {
  getAll,
  create,
  getOne,
  createEntryOfPatient,
};
