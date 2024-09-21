import { Box } from "@mui/material";
import { OccupationalHealthCareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
interface Props {
  entry: OccupationalHealthCareEntry;
}
const OccupationalHealthcare = ({ entry }: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <div>
        {entry.date} <WorkIcon color={"inherit"} /> {entry.employerName}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};

export default OccupationalHealthcare;
