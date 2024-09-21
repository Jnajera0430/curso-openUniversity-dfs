import { HealthCheckEntry, HealthCheckRating } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";

interface Props {
  entry: HealthCheckEntry;
}
const HealthCheck = ({ entry }: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <div>
        {entry.date} <MedicalServicesIcon />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>
        <FavoriteIcon
          sx={{
            color:
              entry.healthCheckRating === HealthCheckRating.Healthy
                ? "#3BF563"
                : entry.healthCheckRating === HealthCheckRating.LowRisk
                ? "#F0BC07"
                : entry.healthCheckRating === HealthCheckRating.HighRisk
                ? "#F05F05"
                : "#F02405",
          }}
        />
      </div>
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};

export default HealthCheck;
