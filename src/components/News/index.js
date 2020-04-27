import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class index extends React.Component {
    state = {
        twitterAcoount: 'SaudiMOH'
    }
    changeHandler = e => {
        this.setState({ twitterAcoount: e.target.value });
    };
    componentDidUpdate(){}
  render() {
            return ( 
                <div className="form-group col-lg-8 col-12 mx-auto my-5 text-center">
                    <div className="row">
                    <div className="col-2">
                        <Link to="/Home">
                            <button className="btn btn-dark px-3 py-2" style={{fontSize:'1rem', fontWeight:'bold',}}> &laquo; رجوع </button>
                        </Link> 
                    </div>
                    <div className="col-10 mt-2 text-center">
                        <h5 className="card-title">أخر أخبار فايروس كورونا</h5> 
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-4 mt-2">
                            حساب
                        </div>
                        <div className="col-8 text-right">
                            <select name="twitterAcoount" className="form-control" value={this.state.value} onChange={this.changeHandler}>
                                <option name="twitterAcoount" value="SaudiMOH">وزارة الصحة السعودية</option>
                                <option name="twitterAcoount" value="MOISaudiArabia">وزارة الداخلية</option>
                                <option name="twitterAcoount" value="SPAregions">واس العام</option>
                            </select> 
                        </div>
                    </div>
                    {
                        this.state.twitterAcoount === 'SaudiMOH' && <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName={this.state.twitterAcoount}
                        options={{height: 650}}
                    />
                    }
                    {
                        this.state.twitterAcoount === 'SPAregions' && <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName={this.state.twitterAcoount}
                        options={{height: 650}}
                    />
                    }
                    {
                        this.state.twitterAcoount === 'MOISaudiArabia' && <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName={this.state.twitterAcoount}
                        options={{height: 650}}
                    />
                    }
                    
                </div>
            )
  }
}
const mapStateToProps = state => ({
    reports: state.reports,
  });
  export default connect(
    mapStateToProps
)(index)