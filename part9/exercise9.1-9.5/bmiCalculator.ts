type ResultParseArguments = {
  value1: number;
  value2: number;
};

export const calculateBmi = (
  height: number,
  weight: number
): string | undefined => {
  const heightInmetros = height / 100;
  const sqrHeightInm = heightInmetros * heightInmetros;
  const mci = weight / sqrHeightInm;

  const limitLowWeight = 18.5;
  const limitHealthyWeigh = 24.99;
  const limitOverWeight = 29.99;
  if (!mci) {
    throw new Error("Data not avalible");
  }
  if (mci < limitLowWeight) {
    return "Low weight";
  }
  if (mci >= limitLowWeight && mci <= limitHealthyWeigh) {
    return "Normal (healthy weight)";
  }
  if (mci > limitHealthyWeigh && mci <= limitOverWeight) {
    return "Overweight (Preobesity)";
  }
  if (mci > limitOverWeight) {
    return " Obesity";
  }

  return undefined;
};

const parseArguments = (args: string[]): ResultParseArguments => {
  const argumentsFormatted = args
    .map((value, index) => {
      if (index > 1) {
        const newValue = Number(value);
        if (!isNaN(newValue)) {
          return newValue;
        }
      }
      return undefined;
    })
    .filter((v) => v);

  return {
    value1: argumentsFormatted[0] ? argumentsFormatted[0] : 0,
    value2: argumentsFormatted[1] ? argumentsFormatted[1] : 0,
  };
};

export const parseArgumentsQuery = (args: string[]): ResultParseArguments => {
  const argumentsFormatted = args
    .map((value) => {
      const newValue = Number(value);
      if (!isNaN(newValue)) {
        return newValue;
      }

      return undefined;
    })
    .filter((v) => v);

  return {
    value1: argumentsFormatted[0] ? argumentsFormatted[0] : 0,
    value2: argumentsFormatted[1] ? argumentsFormatted[1] : 0,
  };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
