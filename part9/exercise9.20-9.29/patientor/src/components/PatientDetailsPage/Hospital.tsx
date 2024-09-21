import { Box } from "@mui/material";
import { HospitalEntry } from "../../types";
interface Props {
  entry: HospitalEntry;
}

const Hospital = ({ entry }: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <div>{entry.date}</div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};

export default Hospital;
