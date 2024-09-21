import { Entry } from "../../types";
import { assertNever } from "../../utils/helper";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
interface Props {
  entry: Entry;
}
const EntryDetail = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;
