import { Box, Button, InputLabel, TextField } from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from "react";
import { EntryOccupationalHealthCareEntryWithoutId } from "../../types";
import Input from "@mui/joy/Input";

interface Props {
  handleSubmitEntry: (e: SyntheticEvent) => Promise<void>;
  setNewEntryOfPatient: Dispatch<
    SetStateAction<EntryOccupationalHealthCareEntryWithoutId>
  >;
  newEntryOfPatient: EntryOccupationalHealthCareEntryWithoutId;
}

const FormOccupationalHealthcare = ({
  handleSubmitEntry,
  setNewEntryOfPatient,
  newEntryOfPatient,
}: Props) => {
  useEffect(() => {
    if (!newEntryOfPatient) {
      setNewEntryOfPatient({
        type: "OccupationalHealthcare",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        employerName: "",
      });
    }
  }, [newEntryOfPatient, setNewEntryOfPatient]);

  if (!newEntryOfPatient) {
    return null;
  }
  console.log({ newEntryOfPatient });

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
          label='employer name'
          variant='standard'
          name='employerName'
          onChange={(e) => {
            setNewEntryOfPatient({
              ...newEntryOfPatient,
              [e.target.name]: e.target.value,
            });
          }}
          value={newEntryOfPatient.employerName}
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
            console.log({ codes });

            const diagnoses = newEntryOfPatient.diagnosisCodes?.concat(codes);
            setNewEntryOfPatient({
              ...newEntryOfPatient,
              diagnosisCodes: diagnoses,
            });
          }}
        />
        <Box>
          <h3>Sick leave</h3>
          <Box
            sx={{
              paddingLeft: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box>
              <InputLabel>StartDate</InputLabel>
              <Input
                variant='solid'
                type='date'
                sx={{
                  background: "#f0f0f0",
                  color: "black",
                }}
                name='startDate'
                onChange={(e) => {
                  if (newEntryOfPatient.sickLeave) {
                    setNewEntryOfPatient({
                      ...newEntryOfPatient,
                      sickLeave: {
                        ...newEntryOfPatient.sickLeave,
                        startDate: e.target.value,
                      },
                    });
                  }
                }}
                value={newEntryOfPatient.sickLeave?.startDate}
              />
            </Box>
            <Box>
              <InputLabel>EndDate</InputLabel>
              <Input
                variant='solid'
                type='date'
                sx={{
                  background: "#f0f0f0",
                  color: "black",
                }}
                name='endDate'
                onChange={(e) => {
                  if (newEntryOfPatient.sickLeave) {
                    setNewEntryOfPatient({
                      ...newEntryOfPatient,
                      sickLeave: {
                        ...newEntryOfPatient.sickLeave,
                        endDate: e.target.value,
                      },
                    });
                  }
                }}
                value={newEntryOfPatient.sickLeave?.endDate}
              />
            </Box>
          </Box>
        </Box>
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

export default FormOccupationalHealthcare;
