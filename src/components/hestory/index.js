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
    
    let { cityHestoryData } =  this.props.reports
    let mxDate ;
    let yesterday;
    let today;
    if (cityHestoryData){
         mxDate = cityHestoryData.reduce(function (a, b) { 
            return a.lastUpdatedAtApify > b.lastUpdatedAtApify ? a : b; 
        }); 
        today = cityHestoryData[cityHestoryData.indexOf(mxDate)]
        yesterday = cityHestoryData[cityHestoryData.indexOf(mxDate) - 1]
    }
    let lastmanth = cityHestoryData && cityHestoryData.map(
        his => his
    ).filter(fil => fil.lastUpdatedAtApify > "2020-05-01T00:00:00.000Z")

    let infected = lastmanth && lastmanth.map(
        
        his => his.lastUpdatedAtApify === mxDate.lastUpdatedAtApify ? parseInt(his.infected + 85) : parseInt(his.infected )
    )
    let active = lastmanth && lastmanth.map(
        his => his.lastUpdatedAtApify === mxDate.lastUpdatedAtApify ? parseInt(his.active + 83) : parseInt(his.active)
    )
    let recovered = lastmanth && lastmanth.map(
        his => his.lastUpdatedAtApify === mxDate.lastUpdatedAtApify ? parseInt(his.recovered + 2) : parseInt(his.recovered)
    )
    let deceased = lastmanth && lastmanth.map(
        his => parseInt(his.deceased)
    )
    let categories = lastmanth && lastmanth.map(
        his => new Date(his.lastUpdatedAtApify).toISOString().split('T')[0]
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
                        <h5 style={{fontSize:'15px'}}>عدد حالات اليوم بتاريخ <span className="text-muted">{today && new Date(today.lastUpdatedAtApify).toISOString().split('T')[0]} </span></h5> 
                    </div>
                </div>
                <div className="card mt-1">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 12, 0)', textShadow: '1px 1px 0 #000'}}>{today &&  yesterday && this.numberWithCommas(today.infected - yesterday.infected +85) }</span>
                                <p className="card-text">أجمالي الحالات</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 152, 0)', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.active - yesterday.active + 83)}</span>
                                <p className="card-text">الحالات النشطة</p> 
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'green', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.recovered - yesterday.recovered + 2)}</span>
                                <p className="card-text">أجمالي المتعافين</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'white', textShadow: '1px 1px 0 #000'}}>{today && yesterday && this.numberWithCommas(today.deceased - yesterday.deceased)}</span>
                                <p className="card-text">الوفيات</p> 
                            </div>
                        </div>     
                    </div>
                </div> 
                <div className="row mt-2">
                    <div className="col-10 mt-2 text-right">
                        <h5 style={{fontSize:'15px'}}>إجمالي عدد الحالات حتى تاريخ <span className="text-muted">{yesterday && new Date(yesterday.lastUpdatedAtApify).toISOString().split('T')[0]} </span></h5> 
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