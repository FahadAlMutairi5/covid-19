import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactLoading from 'react-loading';
import ReactApexChart from "react-apexcharts";


class index extends React.Component {

    state = {
        value: "infected",
        sortby: "max",
    }
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    changeHandlerCity = e => {
        if (e.target.value !== "أختر المدينة"){
            document.getElementById(e.target.value).scrollIntoView();
        }
    };
  render() {
    let {  cityHestoryData } =  this.props.reports
    let mxDate ;
    let yesterday;
    // let today;
    if (cityHestoryData){
         mxDate = cityHestoryData.reduce(function (a, b) { 
            return a.lastUpdatedAtApify > b.lastUpdatedAtApify ? a : b; 
        }); 
        // today = cityHestoryData[cityHestoryData.indexOf(mxDate) ]
        yesterday = cityHestoryData[cityHestoryData.indexOf(mxDate) - 1]
    }
    let recordPerDay = [];

    if (cityHestoryData){
        for (let i = 0; i < cityHestoryData.length ; i++){
            let obje = {};
            if (i===0){
                obje['day'] = cityHestoryData[i].date;
                obje['time'] = cityHestoryData[i].lastUpdatedAtApify;
                obje['total'] = cityHestoryData[i].infected - 0 
                obje['active'] = cityHestoryData[i].active - 0 
                obje['recovered'] = cityHestoryData[i].recovered - 0 
                obje['deceased'] = cityHestoryData[i].deceased - 0 
                recordPerDay.push(obje)
            }else{
                obje['day'] = cityHestoryData[i].date;
                obje['time'] = cityHestoryData[i].lastUpdatedAtApify;
                obje['total'] = cityHestoryData[i].infected - cityHestoryData[i-1].infected 
                obje['active'] = cityHestoryData[i].active - cityHestoryData[i-1].active 
                obje['recovered'] = cityHestoryData[i].recovered - cityHestoryData[i-1].recovered 
                obje['deceased'] = cityHestoryData[i].deceased - cityHestoryData[i-1].deceased 
                recordPerDay.push(obje)
            }
        }
    }
    // console.log(new Date(today && today.time).getMinutes())
    // console.log(new Date(today && today.time).getHours())
    var days = 5; // Days you want to subtract
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var month = last.getMonth()+1 < 10 ? `0${last.getMonth()+1}` : last.getMonth()+1;
    var day = last.getDate() < 10 ? `0${last.getDate()}` : last.getDate();
    let lastSt = `${last.getFullYear()}-${month}-${day}`
    // console.log(lastSt)
    let lastmanth = cityHestoryData && cityHestoryData.map(
        his => his
    ).filter(fil => fil.lastUpdatedAtApify > `2020-08-01T00:00:00.000Z`)
    
    // if (fullDataHis2){
    //     for (let i=0 ; i<fullDataHis2.length; i++){
    //         if (fullDataHis2[i].time > "2020-05-01T00:00:00.000Z" && fullDataHis2[i].day !== '2020-05-12'){
    //             if (fullDataHis2[i].day === '2020-05-13'){
    //                 fullDataHis2[i].day = '2020-05-12'
    //                 lastmanth.push(fullDataHis2[i])
    //             }else{
    //                 lastmanth.push(fullDataHis2[i])
    //             }
    //         }
    //     }
    // }

    
    
    let lastmanthRecordPerDay = recordPerDay && recordPerDay.map(
        his => his
    ).filter(fil => fil.day >= lastSt && fil.day)
    // if (recordPerDay){
    //     for (let i=0 ; i<recordPerDay.length; i++){
    //         if (recordPerDay[i].day >= lastSt && recordPerDay[i].day !== '2020-05-12'){
    //             if (recordPerDay[i].day === '2020-05-13'){
    //                 recordPerDay[i].day = '2020-05-12'
    //                 lastmanthRecordPerDay.push(recordPerDay[i])
    //             }else{
    //                 lastmanthRecordPerDay.push(recordPerDay[i])
    //             }
    //         }
    //     }
    // }

    let infected = lastmanth && lastmanth.map(
        
        his => parseInt(his.infected < 0 ? 0 : his.infected)
    )

    let infectedRecordPerDay = lastmanthRecordPerDay && lastmanthRecordPerDay.map(
        
        his => parseInt(his.total < 0 ? 0 : his.total)
    )

    let active = lastmanth && lastmanth.map(
        his => parseInt(his.active < 0 ? 0 : his.active)
    )

    let activeRecordPerDay = lastmanthRecordPerDay && lastmanthRecordPerDay.map(
        his => parseInt(his.active < 0 ? 0 : his.active)
    )

    let recovered = lastmanth && lastmanth.map(
        his => parseInt(his.recovered < 0 ? 0 : his.recovered)
    )

    let recoveredRecordPerDay = lastmanthRecordPerDay && lastmanthRecordPerDay.map(
        his => parseInt(his.recovered < 0 ? 0 : his.recovered)
    )

    let deceased = lastmanth && lastmanth.map(
        his => parseInt(his.deceased < 0 ? 0 : his.deceased)
    )

    let deceasedRecordPerDay = lastmanthRecordPerDay && lastmanthRecordPerDay.map(
        his => parseInt(his.deceased < 0 ? 0 : his.deceased)
    )

    let categories = lastmanth && lastmanth.map(
        his => his.date
    )

    let categoriesRecordPerDay = lastmanthRecordPerDay && lastmanthRecordPerDay.map(
        his => his.day
    )

    let seriesD = [
            {
            "name": 'الإجمالي' ,
            "data":infected
            },
            {
                "name": 'النشطة' ,
                "data":active
            },
            {
                "name": 'المتعافين' ,
                "data":recovered
            },
            {
                "name": 'الوفيات' ,
                "data":deceased
            }
        ]

    let seriesDRecordPerDay = [
        {
        "name": 'الإجمالي' ,
        "data":infectedRecordPerDay
        },
        {
            "name": 'النشطة' ,
            "data":activeRecordPerDay
        },
        {
            "name": 'المتعافين' ,
            "data":recoveredRecordPerDay
        },
        {
            "name": 'الوفيات' ,
            "data":deceasedRecordPerDay
        }
    ]
    let option = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '100%'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: false,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          type: 'datetime',
          categories: categories,
          title: {
                offsetY: -50,
            },
          labels: {
                show: true,
                rotate: 0,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label',
                },
                offsetX: 0,
                offsetY: 0,
                format: "MM/dd",
                formatter: undefined,
                datetimeUTC: true,
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                },
            }
        },
        yaxis: {
          title: {
            type: 'numeric',
            text: 'عدد الحالات',
            offsetX: -70,
            style: {
                fontSize: '13px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-title',
            },
   
          },
          labels: {
            show: true,
            align: 'center',
            minWidth: 0,
            maxWidth: 160,
            style: {
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0
        }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val 
            }
          }
        }
      }

    let optionRecordPerDay = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
        horizontal: false,
        columnWidth: '100%'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: false,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        type: 'datetime',
        categories: categoriesRecordPerDay,
        title: {
            offsetY: -50,
        },
        labels: {
            show: true,
            rotate: 0,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            style: {
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: "MM/dd",
            formatter: undefined,
            datetimeUTC: true,
            datetimeFormatter: {
                year: 'yyyy',
                month: 'MMM \'yy',
                day: 'dd MMM',
                hour: 'HH:mm'
            },
        }
    },
    yaxis: {
        title: {
        type: 'numeric',
        text: 'عدد الحالات',
        offsetX: -70,
        style: {
            fontSize: '13px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },

        },
        labels: {
        show: true,
        align: 'center',
        minWidth: 0,
        maxWidth: 160,
        style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0
    }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
        formatter: function (val) {
            return val 
        }
        }
    }
    }

        if (yesterday) {
            return (
            <div className="form-group col-lg-8 col-12 mx-auto my-5 text-right text-center">
                <div className="row">
                    <div className="col-2">
                        <Link to="/Home">
                            <button className="btn btn-dark px-3 py-2" style={{fontSize:'1rem', fontWeight:'bold',}} onClick={() => this.setState({filterby:"infected", sortby:"max"})}> &laquo; رجوع </button>
                        </Link> 
                    </div>
                    <div className="col-10 mt-2 text-center">
                        <h5 className="card-title">إحصائيات</h5> 
                    </div>
                </div>
                {/* <div className="row mt-3">
                    <div className="col-10 mt-2 text-right">
                        <h5 style={{fontSize:'15px'}}>عدد حالات اليوم بتاريخ <span className="text-muted">{today && today.date} </span></h5>
                    </div>

                    {
                        today &&  yesterday && this.numberWithCommas(today.infected - yesterday.infected) === "0" && this.numberWithCommas(today.active - yesterday.active) === "0" && this.numberWithCommas(today.recovered - yesterday.recovered) === "0" && this.numberWithCommas(today.deceased - yesterday.deceased) === "0" ?
                        <div className="col-12  text-right">
                            <span className="" style={{fontSize:'10px', color:'red'}}>  لم يتم تحديث البيانات من المصدر لهذا اليوم إلى الأن </span>
                        </div> : <div></div> 
                    }

                </div>
                <div className="card mt-1"> */}
                    {/* <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 12, 0)', textShadow: '1px 1px 0 #000'}}>{today &&  yesterday && this.numberWithCommas(today.infected - yesterday.infected < 0 ? 0 : today.infected - yesterday.infected) }</span>
                                <p className="card-text">أجمالي الحالات</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 152, 0)', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.active - yesterday.active < 0 ? 0 : today.active - yesterday.active)}</span>
                                <p className="card-text">الحالات النشطة</p> 
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'green', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.recovered - yesterday.recovered < 0 ? 0 : today.recovered - yesterday.recovered )}</span>
                                <p className="card-text">أجمالي المتعافين</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'white', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.deceased- yesterday.deceased< 0 ? 0 : today.deceased- yesterday.deceased)}</span>
                                <p className="card-text">الوفيات</p> 
                            </div>
                        </div>     
                    </div>
                </div>  */}
                <div className="row mt-2">
                    <div className="card-body">
                        <div className="text-right">
                        <h5 style={{fontSize:'15px'}} > تفاصيل عدد الحالات اليومية  </h5>
                        </div>
                        <div className="col-12 mt-1 border p-١">
                            <ReactApexChart options={optionRecordPerDay} series={seriesDRecordPerDay} type="bar" height={350} />
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-10 mt-2 text-right">
                        <h5 style={{fontSize:'15px'}}>إجمالي عدد الحالات حتى تاريخ <span className="text-muted">{yesterday && yesterday.date} </span></h5> 
                    </div>
                </div>
                <div className="card mt-1">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 12, 0)', textShadow: '1px 1px 0 #000'}}>{yesterday && this.numberWithCommas(yesterday.infected)}</span>
                                <p className="card-text">أجمالي الحالات</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 152, 0)', textShadow: '1px 1px 0 #000'}}>{yesterday && this.numberWithCommas(yesterday.active)}</span>
                                <p className="card-text">الحالات النشطة</p> 
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'green', textShadow: '1px 1px 0 #000'}}>{yesterday && this.numberWithCommas(yesterday.recovered)}</span>
                                <p className="card-text">أجمالي المتعافين</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'white', textShadow: '1px 1px 0 #000'}}>{yesterday && this.numberWithCommas(yesterday.deceased)}</span>
                                <p className="card-text">الوفيات</p> 
                            </div>
                        </div>     
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="card-body">
                        <div className="text-right">
                        <h5 style={{fontSize:'15px'}} > تفاصيل إجمالي عدد الحالات لشهر الحالي </h5>
                        </div>
                        <div className="col-12 mt-1 border p-١">
                            <ReactApexChart options={option} series={seriesD} type="bar" height={350} />
                        </div>
                    </div>
                </div>
            </div>
            );  
        }else {
            return (
            <div className="form-group col-lg-8 col-12 mx-auto my-5 text-right text-center"> 
                <div className="row">
                    <div className="col-2">
                        <Link to="/Home">
                            <button className="btn btn-dark px-3 py-2" style={{fontSize:'1rem', fontWeight:'bold',}} onClick={() => this.setState({filterby:"infected", sortby:"max"})}> &laquo; رجوع </button>
                        </Link> 
                    </div>
                    <div className="col-10 mt-2 text-center">
                        <h5 className="card-title">إحصائيات</h5> 
                    </div>
                </div>
                <div className="col-12 mt-5" style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'}}>
                    <ReactLoading type='spinningBubbles' color="#48D1CC" />
                </div>
            </div>
            );
        }
  }
}
const mapStateToProps = state => ({
    reports: state.reports,
  });
  export default connect(
    mapStateToProps
)(index)