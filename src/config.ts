export const BASE_URL = "http://127.0.0.1:5000";

export const USE_MOCK = true;

export const QUERY = USE_MOCK ? `${BASE_URL}/query-mock` : `${BASE_URL}/query`;
export const EXICUTE_QUERY = `${BASE_URL}/exicute-raw-query`;
export const SAVE_QUERY = `${BASE_URL}/save-query`;
export const CALL_GPT = `${BASE_URL}/call-gpt`;
export const UPLOAD_DOC = `${BASE_URL}/upload`;
export const COLLECTIONS = `${BASE_URL}/collection`;
export const SEARCH = `${BASE_URL}/search`;
export const ANALITICS = USE_MOCK
  ? `${BASE_URL}/analitics-mock`
  : `${BASE_URL}/analitics`;

export const colors = [
  // "#d04a02cf",

  "rgb(75, 192, 192)",
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(153, 102, 255)",
  "rgb(255, 205, 86)",
  "rgb(153, 102, 255)",
];
