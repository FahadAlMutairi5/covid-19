import axios from "axios";
import * as actionTypes from "./actionTypes";

const instance = axios.create({
  baseURL: "https://api.apify.com/v2/"
});

const instance2 = axios.create({
  baseURL: "https://covid-193.p.rapidapi.com/"
});

const headers = {
  'x-rapidapi-host': 'covid-193.p.rapidapi.com',
  'x-rapidapi-key': 'be5168c574msh0ced3c29c242f32p19e408jsn00362df9fd1d'
}

export const fetchReports = () => {
  return async dispatch => {
    try {
      let res = await instance.get("key-value-stores/40xwYCZ57p5OkyBIJ/records/LATEST?disableRedirect=true");
      const data = res.data;
      dispatch(fetchReportsCou())
      dispatch({
        type: actionTypes.FETCH_ALL_COVID_19,
        payload: data
      });
    } catch (error) {
      console.log("Something went wrong with ", error);
    }
  };
};

export const fetchReportsCou = () => {
  return async dispatch => {
    try {
      let res = await instance2.get("/statistics?country=Saudi-Arabia", {'headers': headers})
      const data = res.data;
      let fullData = {
        'infected': data.response[0].cases.total,
        'active': data.response[0].cases.active,
        'recovered': data.response[0].cases.recovered,
        'deceased': data.response[0].deaths.total,

      }
      dispatch({
        type: actionTypes.FETCH_ALL_COVID_19_2,
        payload: fullData
      });
    }catch (error) {
      console.log("Something went wrong with ", error);
    }
  }
}


export const fetchHestoryReports = () => {
  return async dispatch => {
    try {
      let res = await instance.get("datasets/OeaEEGdhvUSkXRrWU/items?format=json&clean=1");
      const data = res.data;
      dispatch(fetchHestoryReports2())
      dispatch({
        type: actionTypes.FETCH_HESTORY_COVID_19,
        payload: data
      });
    } catch (error) {
      console.log("Something went wrong with ", error);
    }
  };
};


export const fetchHestoryReports2 = () => {
  return async dispatch => {
    try {
      let res = await instance2.get("/history?country=Saudi-Arabia", {'headers': headers})
      const data = res.data;
      dispatch({
        type: actionTypes.FETCH_HESTORY_COVID_19_2,
        payload: data
      });
    } catch (error) {
      console.log("Something went wrong with ", error);
    }
  };
};

