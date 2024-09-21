import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import {
  Diagnosis,
  EntryHealthRatingWithoutId,
  EntryHospitalWithoutId,
  EntryOccupationalHealthCareEntryWithoutId,
  EntryWithoutId,
  Gender,
  Patient,
} from "../../types";
import patients from "../../services/patients";
import diagnoseServices from "../../services/diagnoses";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import InfoIcon from "@mui/icons-material/Info";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Box, Button } from "@mui/material";
import EntryDetail from "./EntryDetail";
import FormHealthCheck from "./FormHealthCheck";
import FormOccupationalHealthcare from "./FormOccupationalHealthcare";
import FormHospital from "./FormHospital";
import { AxiosError } from "axios";

interface PatientDetailsPageProps {
  patient: Patient | null;
}
const PatientDetailsPage = ({ patient }: PatientDetailsPageProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [patientState, setPatientState] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [handleForms, setHandleForms] = useState<
    "Hospital" | "OccupationalHealthcare" | "HealthCheck" | null
  >(null);

  const [newEntryOfPatient, setNewEntryOfPatient] =
    useState<EntryWithoutId | null>(null);

  const handleSubmitEntry = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (newEntryOfPatient && patientState) {
        const newEntryCreated = await patients.createEntryOfPatient(
          patientState.id,
          newEntryOfPatient
        );
        if (newEntryCreated) {
          setPatientState({
            ...patientState,
            entries: patientState.entries.concat(newEntryCreated),
          });
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }

      console.error({ error });
    }
  };

  useEffect(() => {
    (async () => {
      if (patient) {
        const dataPatients = await patients.getOne(patient.id);
        const dataDiagnoses = await diagnoseServices.getAll();

        setPatientState(dataPatients);
        setDiagnoses(dataDiagnoses);
      }
    })();
  }, [patient]);

  if (!patientState || !diagnoses) {
    return null;
  }

  return (
    <div>
      <Box display='flex' flexDirection='row' gap={2}>
        <h2>{patientState.name}</h2>
        <div>
          {patientState.gender === Gender.Male ? (
            <MaleIcon />
          ) : patientState.gender === Gender.Female ? (
            <FemaleIcon />
          ) : (
            <TransgenderIcon />
          )}
        </div>
      </Box>
      <div>ssh: {patientState.ssn}</div>
      <div>occupation: {patientState.occupation}</div>
      {message && (
        <Box
          sx={{
            background: "#fadbd8",
            padding: "0.5rem 1rem",
            color: "#c0392b",
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box>
            <InfoIcon
              sx={{
                color: "#ba4a00 ",
              }}
            />
          </Box>
          <Box>{message}</Box>
        </Box>
      )}
      <Box
        sx={{
          marginTop: "1rem",
          padding: "2rem 1rem 1rem 1rem",
          border: "1px dashed black",
        }}
      >
        <h3>New entry</h3>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            onClick={() => {
              setNewEntryOfPatient(null);
              setHandleForms("Hospital");
            }}
            variant='outlined'
            color='inherit'
          >
            Form Hospital
          </Button>
          <Button
            onClick={() => {
              setNewEntryOfPatient(null);
              setHandleForms("HealthCheck");
            }}
            variant='outlined'
            color='inherit'
          >
            Form HealthCheck
          </Button>
          <Button
            onClick={() => {
              setNewEntryOfPatient(null);
              setHandleForms("OccupationalHealthcare");
            }}
            variant='outlined'
            color='inherit'
          >
            Form OccupationalHealthcare
          </Button>
        </Box>
        {handleForms === "HealthCheck" && (
          <FormHealthCheck
            handleSubmitEntry={handleSubmitEntry}
            newEntryOfPatient={newEntryOfPatient as EntryHealthRatingWithoutId}
            setNewEntryOfPatient={
              setNewEntryOfPatient as Dispatch<
                SetStateAction<EntryHealthRatingWithoutId>
              >
            }
          />
        )}
        {handleForms === "Hospital" && (
          <FormHospital
            handleSubmitEntry={handleSubmitEntry}
            newEntryOfPatient={newEntryOfPatient as EntryHospitalWithoutId}
            setNewEntryOfPatient={
              setNewEntryOfPatient as Dispatch<
                SetStateAction<EntryHospitalWithoutId>
              >
            }
          />
        )}
        {handleForms === "OccupationalHealthcare" && (
          <FormOccupationalHealthcare
            handleSubmitEntry={handleSubmitEntry}
            newEntryOfPatient={
              newEntryOfPatient as EntryOccupationalHealthCareEntryWithoutId
            }
            setNewEntryOfPatient={
              setNewEntryOfPatient as Dispatch<
                SetStateAction<EntryOccupationalHealthCareEntryWithoutId>
              >
            }
          />
        )}
      </Box>

      <h3>entries</h3>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        {patientState.entries.map((entry) => (
          <EntryDetail key={entry.id} entry={entry} />
        ))}
      </Box>
    </div>
  );
};

export default PatientDetailsPage;
