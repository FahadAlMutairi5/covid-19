
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

          // console.log("1",arrayH)

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
            // console.log(arrayH3)
            // let objec128 = arrayH3[108]

            for ( let i=0; i < arrayH3.length; i++ ){
              obj2[arrayH3[i]['day']] = arrayH3[i];
            }
            
            arrayH3 = []
  
            for ( var key2 in obj2 )
              arrayH3.push(obj2[key2]);

            // arrayH3.splice(51, 1)

            // let objec128 = arrayH3[51]
            // objec128.day = '2020-05-12'

            // let objec138 = arrayH3[52]
            // objec138.day = '2020-05-13'

            // arrayH3[51] = objec128
            // arrayH3[52] = objec138
            // let obj128Old = arrayH3.indexOf(arrayH3.filter(fil => fil.day === '2020-05-12')[0])
            // let obj128 = arrayH3.indexOf(arrayH3.filter(fil => fil.time === '2020-05-12T12:45:05+00:00')[0])
            // objec128.day = '2020-05-12'
            // arrayH3[51] = objec128
            // console.log("2",arrayH3)
            // console.log(obj128)
            // console.log(obj128Old)
            // console.log(arrayH3[obj128Old])
            // arrayH3[51].day = '2020-05-12'
            // arrayH3.pop()
            // arrayH3.push(obj128)
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