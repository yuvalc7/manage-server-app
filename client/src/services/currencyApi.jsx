import axios from "axios";

const apiUrl = "https://free.currconv.com/api/v7/convert?";

export function getConverCurrency(currency) {
  console.log(process.env.REACT_APP_CURRENCY_API_KEY);
  return axios.get(apiUrl, {
    params: {
      q: "USD_" + currency,
      compact: "ultra",
      apiKey: process.env.REACT_APP_CURRENCY_API_KEY,
    },
  });
  //return res.data;
}
