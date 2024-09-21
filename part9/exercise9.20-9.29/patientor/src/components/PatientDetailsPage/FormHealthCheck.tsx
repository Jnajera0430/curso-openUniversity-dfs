import { Box, Button, InputLabel, TextField } from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from "react";
import { EntryHealthRatingWithoutId, HealthCheckRating } from "../../types";
import { Input } from "@mui/joy";

interface Props {
  handleSubmitEntry: (e: SyntheticEvent) => Promise<void>;
  setNewEntryOfPatient: Dispatch<SetStateAction<EntryHealthRatingWithoutId>>;
  newEntryOfPatient: EntryHealthRatingWithoutId;
}
const FormHealthCheck = ({
  handleSubmitEntry,
  newEntryOfPatient,
  setNewEntryOfPatient,
}: Props) => {
  useEffect(() => {
    if (!newEntryOfPatient) {
      setNewEntryOfPatient({
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
      });
    }
  }, [newEntryOfPatient, setNewEntryOfPatient]);

  if (!newEntryOfPatient) {
    return null;
  }

  return (
    <form onSubmit={handleSubmitEntry}>
      <Box display={"flex"} gap={2} flexDirection={"column"}>
        <TextField
          id='outlined-basic'
          label='Description'
          variant='standard'
          name='description'
          onChange={(e) => {
            setNewEntryOfPatient({
              ...newEntryOfPatient,
              [e.target.name]: e.target.value,
            });
          }}
          value={newEntryOfPatient.description}
        />

        <Box>
          <InputLabel>Date</InputLabel>
          <Input
            variant='solid'
            type='date'
            sx={{
              background: "#f0f0f0",
              color: "black",
            }}
            name='date'
            onChange={(e) => {
              setNewEntryOfPatient({
                ...newEntryOfPatient,
                [e.target.name]: e.target.value,
              });
            }}
            value={newEntryOfPatient.date}
          />
        </Box>

        <TextField
          id='outlined-basic'
          label='Specialist'
          variant='standard'
          name='specialist'
          onChange={(e) => {
            setNewEntryOfPatient({
              ...newEntryOfPatient,
              [e.target.name]: e.target.value,
            });
          }}
          value={newEntryOfPatient.specialist}
        />
        <TextField
          id='outlined-basic'
          label='Healthcheck rating'
          variant='standard'
          name='healthCheckRating'
          onChange={(e) => {
            setNewEntryOfPatient({
              ...newEntryOfPatient,
              [e.target.name]: e.target.value,
            });
          }}
          value={newEntryOfPatient.healthCheckRating}
        />
        <TextField
          id='outlined-basic'
          label='Diagnosis codes'
          variant='standard'
          name='diagnosisCodes'
          onChange={(e) => {
            const codes = e.target.value
              .split(",")
              .filter((v) => v.trim().length !== 0);

            const diagnoses = newEntryOfPatient.diagnosisCodes?.concat(codes);
            setNewEntryOfPatient({
              ...newEntryOfPatient,
              diagnosisCodes: diagnoses,
            });
          }}
          // value={newEntryOfPatient.diagnosisCodes?.join(", ")}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button sx={{ background: "red", color: "white" }} type='button'>
            cancel
          </Button>
          <Button sx={{ background: "#ABABAB", color: "white" }} type='submit'>
            add
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default FormHealthCheck;
