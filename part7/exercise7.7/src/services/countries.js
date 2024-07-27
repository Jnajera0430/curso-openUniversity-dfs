import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";
export const getCountryByName = (name) => {
  const result = axios
    .get(`${baseUrl}/${name}`)
    .then((res) => {
      console.log({ data: res.data });
      return { found: true, ...res.data };
    })
    .catch((e) => {
      console.log({ e });
      return { found: false, ...e };
    });
  console.log({ result });
  return result;
};
