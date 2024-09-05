interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type ResultParseArguments1 = {
  target: number;
  argumentsFormatted: number[];
};
type ResultParseArguments2 = {
  argumentsFormatted: number[];
};
//promedio de horas diarias de ejercicios
// compare con la cantidad de objetivo de horas diarias
//Devuelva:
/*
el número de días
el número de días de entrenamiento
el valor objetivo original
el tiempo promedio calculado
valor booleano que describe si se alcanzó el objetivo
una calificación entre los números 1-3 que indica qué tan bien se cumplen las horas. Puedes decidir la métrica por tu cuenta.
un valor de texto que explique la calificación, puedes inventar las explicaciones
*/
export const calculateExercises = (
  target: number,
  dailyHoursExercise: number[]
): Result => {
  const dailyHoursWorked = dailyHoursExercise.filter((d) => d > 0);
  const periodLength = dailyHoursExercise.length;
  const trainingDays = dailyHoursWorked.length;
  const totalHours = dailyHoursExercise.reduce((hour, totalHour) => {
    return totalHour + hour;
  }, 0);
  const average = totalHours / dailyHoursExercise.length;
  const rating = generateRating(average, target);
  const ratingDescription = generateRatingDescription(rating);
  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const generateRating = (average: number, target: number): number => {
  const result = target - average;
  if (isNaN(result)) {
    throw new Error("ocurred a problem");
  }
  if (result <= 0) {
    return 3;
  }
  if (result > 0 && result <= 1) {
    return 2;
  }
  if (result > 1) {
    return 1;
  }

  return 1;
};

const generateRatingDescription = (rating: number): string => {
  if (rating < 2) {
    return "could be better, make an effort";
  }
  if (rating >= 2 && rating < 2.6) {
    return "not too bad but could be better";
  }
  if (rating >= 2.6) {
    return "you are doing well, keep it up";
  }
  return "";
};

const parseArguments1 = (args: string[]): ResultParseArguments1 => {
  let target: number;
  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
    throw new Error("Provided values were not numbers!");
  }
  const argumentsFormatted = args
    .map((value, index) => {
      if (index > 2) {
        const newValue = Number(value);
        if (!isNaN(newValue)) {
          return newValue;
        } else {
          throw new Error("'Provided values were not numbers!'");
        }
      }

      return undefined;
    })
    .filter((v) => v != undefined);

  return { target, argumentsFormatted };
};

export const parseArgumentsBody = (args: string[]): ResultParseArguments2 => {
  const argumentsFormatted = args
    .map((value, index) => {
      if (index > 2) {
        const newValue = Number(value);
        if (!isNaN(newValue)) {
          return newValue;
        } else {
          throw new Error("'Provided values were not numbers!'");
        }
      }

      return undefined;
    })
    .filter((v) => v != undefined);

  return { argumentsFormatted };
};

try {
  const { argumentsFormatted, target } = parseArguments1(process.argv);

  console.log(calculateExercises(target, argumentsFormatted));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
