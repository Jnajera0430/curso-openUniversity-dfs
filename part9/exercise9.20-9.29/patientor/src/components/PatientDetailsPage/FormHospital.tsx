import { Box, Button, InputLabel, TextField } from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from "react";
import { EntryHospitalWithoutId } from "../../types";
import { Input } from "@mui/joy";

interface Props {
  handleSubmitEntry: (e: SyntheticEvent) => Promise<void>;
  setNewEntryOfPatient: Dispatch<SetStateAction<EntryHospitalWithoutId>>;
  newEntryOfPatient: EntryHospitalWithoutId;
}
const FormHospital = ({
  handleSubmitEntry,
  newEntryOfPatient,
  setNewEntryOfPatient,
}: Props) => {
  useEffect(() => {
    if (!newEntryOfPatient) {
      setNewEntryOfPatient({
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: "",
        },
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
          value={newEntryOfPatient.description ?? ""}
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
        <Box>
          <h3>Discharge</h3>
          <Box
            sx={{
              paddingLeft: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              id='outlined-basic'
              label='Date'
              variant='standard'
              name='date'
              onChange={(e) => {
                setNewEntryOfPatient({
                  ...newEntryOfPatient,
                  discharge: {
                    ...newEntryOfPatient.discharge,
                    [e.target.name]: e.target.value,
                  },
                });
              }}
              value={newEntryOfPatient.discharge.date}
            />
            <TextField
              id='outlined-basic'
              label='Criteria'
              variant='standard'
              name='criteria '
              onChange={(e) => {
                setNewEntryOfPatient({
                  ...newEntryOfPatient,
                  discharge: {
                    ...newEntryOfPatient.discharge,
                    criteria: e.target.value,
                  },
                });
              }}
              value={newEntryOfPatient.discharge.criteria}
            />
          </Box>
        </Box>
        <TextField
          id='outlined-basic'
          label='Diagnosis codes'
          variant='standard'
          name='diagnosisCodes'
          onChange={(e) => {
            const codes = e.target.value
              .split(",")
              .filter((v) => v.trim().length !== 0);
            console.log({ codes });

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

export default FormHospital;
