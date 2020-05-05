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
    
    let { cityHestoryData , fullDataHis2 } =  this.props.reports
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

    let lastmanth = fullDataHis2 && fullDataHis2.map(
        his => his
    ).filter(fil => fil.time > "2020-05-01T00:00:00.000Z")
    let infected = lastmanth && lastmanth.map(
        
        his => parseInt(his.cases.total)
    )

    let active = lastmanth && lastmanth.map(
        his => parseInt(his.cases.active)
    )

    let recovered = lastmanth && lastmanth.map(
        his => parseInt(his.cases.recovered)
    )

    let deceased = lastmanth && lastmanth.map(
        his => parseInt(his.deaths.total)
    )

    let categories = lastmanth && lastmanth.map(
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
                </div>
                <div className="card mt-1">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 12, 0)', textShadow: '1px 1px 0 #000'}}>{today &&  yesterday && this.numberWithCommas(today.cases.total - yesterday.cases.total) }</span>
                                <p className="card-text">أجمالي الحالات</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 152, 0)', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.cases.active - yesterday.cases.active)}</span>
                                <p className="card-text">الحالات النشطة</p> 
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'green', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.cases.recovered - yesterday.cases.recovered)}</span>
                                <p className="card-text">أجمالي المتعافين</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'white', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.deaths.total - yesterday.deaths.total)}</span>
                                <p className="card-text">الوفيات</p> 
                            </div>
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