import express, { Request, Response } from "express";
import { calculateBmi, parseArgumentsQuery } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());
app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height = "", weight = "" } = req.query;
  let result: Result = {
    bmi: "",
    height: 0,
    weight: 0,
  };
  if (!height || !weight) {
    return res.json({ error: "malformatted parameters" });
  }
  if (typeof height === "string" && typeof weight === "string") {
    const { value1, value2 } = parseArgumentsQuery([height, weight]);
    const resultCalculated = calculateBmi(value1, value2);
    if (!resultCalculated) {
      return res.json({ error: "An error has occurred in the calculation" });
    }
    result = { bmi: resultCalculated, height: value1, weight: value2 };
  }
  return res.json(result);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || isNaN(Number(target))) {
    return res.json({
      error: "parameters missing",
    });
  }

  const result = calculateExercises(
    Number(target),
    daily_exercises as number[]
  );
  return res.json(result);
});

const PORT: number = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

interface Result {
  weight: number;
  height: number;
  bmi: string;
}
