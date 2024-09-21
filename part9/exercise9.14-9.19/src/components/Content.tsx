import { CoursePart } from "../types/types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((coursePart) => {
        return <Part coursePart={coursePart} />;
      })}
    </div>
  );
};

export default Content;
