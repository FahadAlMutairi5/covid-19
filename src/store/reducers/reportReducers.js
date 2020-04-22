
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    filterData: null,
    data:null,
    fullData:null,
    loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.FETCH_ALL_COVID_19:

        let arabic = /[\u0600-\u06FF]/;
        let dataR = action.payload
        let array = []

        for (let x in dataR) {
          if(arabic.test(x)){
            let objectOfData = {
              "nameOfCity": x,
              "Info":dataR[x]
            }
            array.push(objectOfData);
          }
        }
        
        return {
          ...state,
          data: array,
          filterData: array,
          fullData:dataR,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default reducer;