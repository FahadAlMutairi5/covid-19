import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactLoading from 'react-loading';

class index extends React.Component {

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  render() {
    let { fullData2, loading } =  this.props.reports
        if (loading) {
            return ( 
                <div className="form-group col-lg-8 col-12 mx-auto my-5 text-center">
                <div className="col-12">
                    <h3>حالات فايروس كورونا في  <br/> المملكة العربية السعودية</h3> 
                </div>
                <div className="col-12 mt-5" style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'}}>
                    <ReactLoading type='spinningBubbles' color="#48D1CC" />
                </div>
            </div>
            )
        } else{
            return (
            <div className="form-group col-lg-8 col-12 mx-auto my-5 text-right text-center">
                <h3>حالات فايروس كورونا في  <br/> المملكة العربية السعودية</h3>
                <div className="text-center mt-2" style={{fontSize:'10px', color:'rgb(230, 12, 0)'}}>
                * يوجد تأخير في عرض البيانات من المصدر *
                </div>
                <div className="card mt-2">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 12, 0)', textShadow: '1px 1px 0 #000'}}>{fullData2 && this.numberWithCommas(fullData2.infected)}</span>
                                <p className="card-text">أجمالي الحالات</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor: 'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'rgb(230, 152, 0)', textShadow: '1px 1px 0 #000'}}>{fullData2 && this.numberWithCommas(fullData2.active)}</span>
                                <p className="card-text">الحالات النشطة</p> 
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-6 col-6 border p-3 animated bounceInRight" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'green', textShadow: '1px 1px 0 #000'}}>{fullData2 && this.numberWithCommas(fullData2.recovered)}</span>
                                <p className="card-text">أجمالي المتعافين</p> 
                            </div>
                            <div className="col-lg-6 col-6 border p-3 animated bounceInLeft" style={{backgroundColor:'rgb(204, 202, 202)'}}>
                                <span style={{fontSize:'1.8rem', fontWeight:'bold', color:'white', textShadow: '1px 1px 0 #000'}}>{fullData2 && this.numberWithCommas(fullData2.deceased)}</span>
                                <p className="card-text">الوفيات</p> 
                            </div>
                        </div>     
                    </div>
                </div>
                <div className="text-center mt-1">
                    <Link to="/Detail" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-block btn-info mt-2 p-3"> أعداد الحالات لكل مدينة  </button>
                    </Link>
                </div>
                <div className="row">
                    <div className="text-center mt-1 col-6">
                        <Link to="/News" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-block btn-info mt-2 p-3"> أخبار فايروس كورونا  <br/> </button>
                            
                        </Link>
                    </div>
                    <div className="text-center mt-1 col-6">
                        <Link to="/Hestory" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-block btn-info mt-2 p-3"> إحصائيات  </button>
                        </Link>
                    </div>
                </div>
                <div className="text-center text-muted mt-3">
                    مصدر المعلومات من موقع وزارة الصحة السعودية 
                    <br/><a href="https://covid19.moh.gov.sa/" target="_blank" rel="noopener noreferrer"> covid 19 </a>     
                    <br/> 
                    بالتعاون مع APIFY 
                    <br/><a href="https://apify.com/covid-19" target="_blank" rel="noopener noreferrer"> APIFY </a>       
                    <br/> من تصميم م.فهد المطيري
                    <br/><a href="https://github.com/FahadAlMutairi5" target="_blank" rel="noopener noreferrer">Github</a> ||   <a href="https://twitter.com/Des_f_b" target="_blank" rel="noopener noreferrer">Twitter</a> 
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