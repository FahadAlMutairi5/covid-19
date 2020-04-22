import axios from "axios";
import * as actionTypes from "./actionTypes";

const instance = axios.create({
  baseURL: "https://api.apify.com/v2/"
});

export const fetchReports = () => {
  return async dispatch => {
    try {
      let res = await instance.get("key-value-stores/40xwYCZ57p5OkyBIJ/records/LATEST?disableRedirect=true");
      const data = res.data;
      dispatch({
        type: actionTypes.FETCH_ALL_COVID_19,
        payload: data
      });
    } catch (error) {
      console.log("Something went wrong with ", error);
    }
  };
};