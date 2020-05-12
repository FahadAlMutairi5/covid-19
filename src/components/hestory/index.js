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
    
    let {  fullDataHis2 } =  this.props.reports
    let mxDate ;
    let yesterday;
    let today;
    if (fullDataHis2){
         mxDate = fullDataHis2.reduce(function (a, b) { 
            return a.time > b.time ? a : b; 
        }); 
        today = fullDataHis2[fullDataHis2.indexOf(mxDate)]
        yesterday = fullDataHis2[fullDataHis2.indexOf(mxDate) - 1]
    }
    let recordPerDay = [];

    if (fullDataHis2){
        for (let i = 0; i < fullDataHis2.length ; i++){
            let obje = {};
            if (i===0){
                obje['day'] = fullDataHis2[i].day;
                obje['time'] = fullDataHis2[i].time;
                obje['total'] = fullDataHis2[i].cases.total - 0 
                obje['active'] = fullDataHis2[i].cases.active - 0 
                obje['recovered'] = fullDataHis2[i].cases.recovered - 0 
                obje['deceased'] = fullDataHis2[i].deaths.total - 0 
                recordPerDay.push(obje)
            }else{
                obje['day'] = fullDataHis2[i].day;
                obje['time'] = fullDataHis2[i].time;
                obje['total'] = fullDataHis2[i].cases.total - fullDataHis2[i-1].cases.total 
                obje['active'] = fullDataHis2[i].cases.active - fullDataHis2[i-1].cases.active 
                obje['recovered'] = fullDataHis2[i].cases.recovered - fullDataHis2[i-1].cases.recovered 
                obje['deceased'] = fullDataHis2[i].deaths.total - fullDataHis2[i-1].deaths.total 
                recordPerDay.push(obje)
            }
        }
    }
    // console.log(new Date(today && today.time).getMinutes())
    // console.log(new Date(today && today.time).getHours())
    var days = 6; // Days you want to subtract
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var month = last.getMonth()+1 < 10 ? `0${last.getMonth()+1}` : last.getMonth()+1;
    var day = last.getDate() < 10 ? `0${last.getDate()}` : last.getDate();
    let lastSt = `${last.getFullYear()}-${month}-${day}`
    // console.log(lastSt)
    let lastmanth = fullDataHis2 && fullDataHis2.map(
        his => his
    ).filter(fil => fil.time > "2020-05-01T00:00:00.000Z")

    let lastmanthRecordPerDay = recordPerDay && recordPerDay.map(
        his => his
    ).filter(fil => fil.day >= lastSt)
    // console.log(lastmanthRecordPerDay)
    let infected = lastmanth && lastmanth.map(
        
        his => parseInt(his.cases.total < 0 ? 0 : his.cases.total)
    )

    let infectedRecordPerDay = lastmanthRecordPerDay && lastmanthRecordPerDay.map(
        
        his => parseInt(his.total < 0 ? 0 : his.total)
    )

    let active = lastmanth && lastmanth.map(
        his => parseInt(his.cases.active < 0 ? 0 : his.cases.active)
    )

    let activeRecordPerDay = lastmanthRecordPerDay && lastmanthRecordPerDay.map(
        his => parseInt(his.active < 0 ? 0 : his.active)
    )

    let recovered = lastmanth && lastmanth.map(
        his => parseInt(his.cases.recovered < 0 ? 0 : his.cases.recovered)
    )

    let recoveredRecordPerDay = lastmanthRecordPerDay && lastmanthRecordPerDay.map(
        his => parseInt(his.recovered < 0 ? 0 : his.recovered)
    )

    let deceased = lastmanth && lastmanth.map(
        his => parseInt(his.deaths.total < 0 ? 0 : his.deaths.total)
    )

    let deceasedRecordPerDay = lastmanthRecordPerDay && lastmanthRecordPerDay.map(
        his => parseInt(his.deceased < 0 ? 0 : his.deceased)
    )

    let categories = lastmanth && lastmanth.map(
        his => his.day
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
                <div className="row mt-3">
                    <div className="col-10 mt-2 text-right">
                        <h5 style={{fontSize:'15px'}}>عدد حالات اليوم بتاريخ <span className="text-muted">{today && today.day} </span></h5>
                    </div>

                    {
                        today &&  yesterday && this.numberWithCommas(today.cases.total - yesterday.cases.total) === "0" && this.numberWithCommas(today.cases.active - yesterday.cases.active) === "0" && this.numberWithCommas(today.cases.recovered - yesterday.cases.recovered) === "0" && this.numberWithCommas(today.deaths.total - yesterday.deaths.total) === "0" ?
                        <div className="col-12  text-right">
                            <span className="" style={{fontSize:'10px', color:'red'}}>  لم يتم تحديث البيانات من المصدر لهذا اليوم إلى الأن </span>
                        </div> : <div></div> 
                    }

                </div>
                <div className="card mt-1">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 12, 0)', textShadow: '1px 1px 0 #000'}}>{today &&  yesterday && this.numberWithCommas(today.cases.total - yesterday.cases.total < 0 ? 0 : today.cases.total - yesterday.cases.total) }</span>
                                <p className="card-text">أجمالي الحالات</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 152, 0)', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.cases.active - yesterday.cases.active < 0 ? 0 : today.cases.active - yesterday.cases.active)}</span>
                                <p className="card-text">الحالات النشطة</p> 
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'green', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.cases.recovered - yesterday.cases.recovered < 0 ? 0 : today.cases.recovered - yesterday.cases.recovered )}</span>
                                <p className="card-text">أجمالي المتعافين</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'white', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.deaths.total - yesterday.deaths.total < 0 ? 0 : today.deaths.total - yesterday.deaths.total)}</span>
                                <p className="card-text">الوفيات</p> 
                            </div>
                        </div>     
                    </div>
                </div> 
                <div className="row mt-2">
                    <div className="card-body">
                        <div className="text-right">
                        <h5 style={{fontSize:'15px'}} > تفاصيل عدد الحالات اليومية لهذا الأسبوع الحالي </h5>
                        </div>
                        <div className="col-12 mt-1 border p-١">
                            <ReactApexChart options={optionRecordPerDay} series={seriesDRecordPerDay} type="bar" height={350} />
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-10 mt-2 text-right">
                        <h5 style={{fontSize:'15px'}}>إجمالي عدد الحالات حتى تاريخ <span className="text-muted">{yesterday && yesterday.day} </span></h5> 
                    </div>
                </div>
                <div className="card mt-1">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 12, 0)', textShadow: '1px 1px 0 #000'}}>{yesterday && this.numberWithCommas(yesterday.cases.total)}</span>
                                <p className="card-text">أجمالي الحالات</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 152, 0)', textShadow: '1px 1px 0 #000'}}>{yesterday && this.numberWithCommas(yesterday.cases.active)}</span>
                                <p className="card-text">الحالات النشطة</p> 
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'green', textShadow: '1px 1px 0 #000'}}>{yesterday && this.numberWithCommas(yesterday.cases.recovered)}</span>
                                <p className="card-text">أجمالي المتعافين</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'white', textShadow: '1px 1px 0 #000'}}>{yesterday && this.numberWithCommas(yesterday.deaths.total)}</span>
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