import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

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

    // if (cityHestoryData) {
    //     let filterby = this.state.value;
    //     if (this.state.sortby === "max") {
    //     filterData.sort(function(a,b) {
    //             return b.Info[filterby] - a.Info[filterby]
    //         })
    //     }else {
    //         filterData.sort(function(a,b) {
    //                 return a.Info[filterby] - b.Info[filterby]
    //             })
    //         }
    // }

    let cityToday = []
    let today_city = []
    if (cityHestoryData){
        let mxDate = cityHestoryData.reduce(function (a, b) { 
           return a.lastUpdatedAtApify > b.lastUpdatedAtApify ? a : b; 
       }); 
       let today = cityHestoryData[cityHestoryData.indexOf(mxDate) ]
       let yesterday = cityHestoryData[cityHestoryData.indexOf(mxDate) - 1]
        today_city = today.citiesH
       let yesterday_city = yesterday.citiesH

       let filterby = this.state.value;
        if (this.state.sortby === "max") {
        today_city.sort(function(a,b) {
                return b.Info[filterby] - a.Info[filterby]
            })
        }else {
            today_city.sort(function(a,b) {
                    return a.Info[filterby] - b.Info[filterby]
                })
            }

       for (let i=0; i<today_city.length; i++){
            for (let y=0; y<yesterday_city.length; y++){
                if (today_city[i].nameOfCity === yesterday_city[y].nameOfCity){
                    let city_today = {
                        nameOfCity: today_city[i].nameOfCity,
                        Info: {
                            infected: today_city[i].Info.infected - yesterday_city[y].Info.infected,
                            deceased: today_city[i].Info.deceased - yesterday_city[y].Info.deceased,
                            active: today_city[i].Info.active - yesterday_city[y].Info.active,
                            recovered: today_city[i].Info.recovered - yesterday_city[y].Info.recovered,
                        }
                    }
                    cityToday.push(city_today)
                }
            }
       }
       for (let j=0; j<today_city.length; j++){
        let today_reg = cityToday.find(
            ele => {return ele.nameOfCity === today_city[j].nameOfCity}
        )
        if (today_reg){
            today_city[j].today_reg = today_reg
        }
       }
    }

        return (
        <div className="form-group col-lg-8 col-12 mx-auto my-5 text-right"> 
            <div className="row">
                <div className="col-2">
                    <Link to="/Home">
                        <button className="btn btn-dark px-3 py-2" style={{fontSize:'1rem', fontWeight:'bold',}} onClick={() => this.setState({filterby:"infected", sortby:"max"})}> &laquo; رجوع </button>
                    </Link> 
                </div>
                <div className="col-10 mt-2 text-center">
                    <h5 className="card-title">أعداد الحالات لكل مدينة</h5> 
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12">
                    <div className="row">
                        <div className="col-4 mt-2">
                            فلتر بواسطة 
                        </div>
                        <div className="col-8 text-right">
                            <select name="value" className="form-control" value={this.state.value} onChange={this.changeHandler}>
                                <option name="value" value="infected">أجمالي الحالات</option>
                                <option name="value" value="active">الحالات النشطة</option>
                                <option name="value" value="recovered">أجمالي المتعافين</option>
                                <option name="value" value="deceased">الوفيات</option> 
                            </select> 
                        </div>
                    </div>

                </div>
                <div className="col-12 mt-3">
                    <div className="row">
                        <div className="col-4">
                            رتب 
                        </div>
                        <div className="col-8 text-right">
                            <select name="sortby" className="form-control" value={this.state.sortby} onChange={this.changeHandler}>
                                <option name="sortby" value="max">من الأكثر الى الأقل</option>
                                <option name="sortby" value="min">من الأقل الى الأكثر</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="row">
                        <div className="col-4">
                            بحث بالمدينة 
                        </div>
                        <div className="col-8 text-right">
                            <select name="sortby" className="form-control" value={this.state.city} onChange={this.changeHandlerCity}>
                                <option name="city">أختر المدينة</option>

                                {
                                    today_city && today_city.map(city => (
                                        <option name="city" key={city.nameOfCity} value={city.nameOfCity}>{city.nameOfCity}</option>
                                        )
                                    ).sort(
                                        (a, b) => a.key.localeCompare(b.key)
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>           
            {
                today_city && today_city.map(city => 
                    (
                        <div className="card mt-3 animated bounceInUp" key={city.nameOfCity} id={city.nameOfCity}>
                            <h4 className="card-title mt-4 text-center">{city.nameOfCity}</h4>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6 col-6 border p-3" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                        <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 12, 0)', textShadow: '1px 1px 0 #000'}}>{city.Info.infected ? this.numberWithCommas(city.Info.infected) < 0 ? 0 : this.numberWithCommas(city.Info.infected) : '-'}</span>
                                        <p className="card-text">أجمالي الحالات</p> 
                                        <hr/>
                                        {
                                            city.today_reg &&  <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 12, 0)', textShadow: '1px 1px 0 #000'}}>{city.today_reg.Info.infected ? this.numberWithCommas(city.today_reg.Info.infected < 0 ? 0 : city.today_reg.Info.infected) : '-' }</span>

                                        }
                                        <p className="card-text"> أجمالي الحالات المسجلة لهذا اليوم</p>
                                    </div>
                                    <div className="col-lg-6 col-6 border p-3" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                        <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 152, 0)', textShadow: '1px 1px 0 #000'}}>{city.Info.active ? this.numberWithCommas(city.Info.active) < 0 ? 0 : this.numberWithCommas(city.Info.active) : '-'}</span>
                                        <p className="card-text">الحالات النشطة</p> 
                                        <hr/>
                                        {
                                            city.today_reg &&  <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 152, 0)', textShadow: '1px 1px 0 #000'}}>{city.today_reg.Info.active ? this.numberWithCommas(city.today_reg.Info.active < 0 ? 0 : city.today_reg.Info.active) : '-'}</span>

                                        }
                                        <p className="card-text"> أجمالي الحالات النشطة المسجلة لهذا اليوم</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-lg-6 col-6 border p-3" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                        <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'green', textShadow: '1px 1px 0 #000'}}>{city.Info.recovered ? this.numberWithCommas(city.Info.recovered) < 0 ? 0 : this.numberWithCommas(city.Info.recovered) : '-'}</span>
                                        <p className="card-text">أجمالي المتعافين</p> 
                                        <hr/>
                                        {
                                            city.today_reg &&  <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'green', textShadow: '1px 1px 0 #000'}}>{city.today_reg.Info.recovered ? this.numberWithCommas(city.today_reg.Info.recovered < 0 ? 0 : city.today_reg.Info.recovered): '-' }</span>

                                        }
                                        <p className="card-text"> أجمالي حالات التعافي المسجلة لهذا اليوم</p>
                                    </div>
                                    <div className="col-lg-6 col-6 border p-3" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                        <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'white', textShadow: '1px 1px 0 #000'}}>{city.Info.deceased ? this.numberWithCommas(city.Info.deceased) < 0 ? 0 : this.numberWithCommas(city.Info.deceased) : '-'}</span>
                                        <p className="card-text">الوفيات</p> 
                                        <hr/>
                                        {
                                            city.today_reg &&  <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'white', textShadow: '1px 1px 0 #000'}}>{city.today_reg.Info.deceased ? this.numberWithCommas(city.today_reg.Info.deceased < 0 ? 0 : city.today_reg.Info.deceased) : '-'}</span>

                                        }
                                        <p className="card-text">أجمالي حالات الوفيات المسجلة لهذا اليوم</p> 
                                    </div>
                                </div>        
                            </div>
                        </div>
                    )
                )
            }
            <div>
                <ScrollUpButton
                EasingType="linear"
                ShowAtPosition={100}
                />
            </div>
        </div>
        );  
  }
}
const mapStateToProps = state => ({
    reports: state.reports,
  });
  export default connect(
    mapStateToProps
)(index)