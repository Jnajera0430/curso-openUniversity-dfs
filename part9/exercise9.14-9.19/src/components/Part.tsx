import { CoursePart } from "../types/types";
import { assertNever } from "../utils/helper";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <div>{coursePart.description}</div>
        </p>
      );
    case "group":
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <div>project exercise:{coursePart.groupProjectCount}</div>
        </p>
      );
    case "background":
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <div>{coursePart.description}</div>
          <div>Submit to {coursePart.backgroundMaterial}</div>
        </p>
      );
    case "special":
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <div>{coursePart.description}</div>
          <div>
            requeriments skill:{" "}
            {coursePart.requirements.map((req, index) => {
              if (index === coursePart.requirements.length - 1) {
                return req;
              }
              return req + ", ";
            })}
          </div>
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
