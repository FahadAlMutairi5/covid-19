
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    filterData: null,
    data:null,
    fullData:null,
    fullData2:null,
    fullDataHis2: null,
    loading: true,
    loadingH: true,
    hestoryData: null,
    cityHestoryData:null,
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
          fullData:dataR
        };

      case actionTypes.FETCH_HESTORY_COVID_19:
          let arabicHESTORY = /[\u0600-\u06FF]/;
          let dataRHESTORY = action.payload
          let arrayH = []
          for (let x in dataRHESTORY) {
            let parentObject = {}
            parentObject["date"] = new Date(dataRHESTORY[x]['lastUpdatedAtApify']).toISOString().split('T')[0]
            parentObject["lastUpdatedAtApify"] = dataRHESTORY[x]['lastUpdatedAtApify']
            parentObject["infected"] = dataRHESTORY[x]['infected']
            parentObject["recovered"] = dataRHESTORY[x]['recovered']
            parentObject["deceased"] = dataRHESTORY[x]['deceased']
            parentObject["active"] = dataRHESTORY[x]['active']

            let arrayHESTORY = []

            for (let y in dataRHESTORY[x]) {
              let objectOfData = {}
              if(arabicHESTORY.test(y)){
                objectOfData["nameOfCity"] = y
                objectOfData["Info"] = dataRHESTORY[x][y]
              }
              if (Object.keys(objectOfData).length > 1){
                arrayHESTORY.push(objectOfData);
              }
            }
            parentObject["citiesH"] = arrayHESTORY
            if (arrayHESTORY.length > 0){
              arrayH.push(parentObject)
            }
          } 

          
          var obj = {};

          for ( let i=0; i < arrayH.length; i++ ){
            obj[arrayH[i]['date']] = arrayH[i];
          }

          arrayH = []

          for ( var key in obj )
            arrayH.push(obj[key]);

          return {
            ...state,
            cityHestoryData: arrayH,
            hestoryData:dataRHESTORY,
            loadingH: false
          };

        case actionTypes.FETCH_ALL_COVID_19_2:
            return {
              ...state,
              fullData2: action.payload,
              loading: false
            };

        case actionTypes.FETCH_HESTORY_COVID_19_2:
            var obj2 = {};
            let arrayH2 = action.payload
            let arrayH3 = arrayH2.response.sort((a, b) => new Date(a.time) - new Date(b.time))
            for ( let i=0; i < arrayH3.length; i++ ){
              obj2[arrayH3[i]['day']] = arrayH3[i];
            }
            
            arrayH3 = []
  
            for ( var key2 in obj2 )
              arrayH3.push(obj2[key2]);


            return {
              ...state,
              fullDataHis2: arrayH3,
              // loading: false
            };    
      default:
        return state;
    }
  };
  
  export default reducer;