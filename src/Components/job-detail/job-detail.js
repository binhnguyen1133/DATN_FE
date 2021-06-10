import React from 'react';
import './job-detail.scoped.css';
import qs from 'query-string';
import _, { join } from 'lodash';
import { Link } from 'react-router-dom';
import ApplyJob from '../apply-job/apply-job';

export class JobDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            job: {
                data: {}
            }
        };
    }

    componentDidMount() {
        const queryParams = qs.parse(this.props.location.search);
        fetch(`${process.env.REACT_APP_API_JOB_DETAIL}?ma_dn=${queryParams.ma_dn}&ma_cv=${queryParams.ma_cv}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        job: this.groupSkill(result.data)
                    });
                    console.log(this.state.job);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    groupSkill(job){
        if((job.length > 1)){
            var array = [];
            let groupSkillJob;
            _.forEach(job, function(j){
                array = _.concat(array, j.ten_skill)
            })
            job[0].ten_skill = array;
            groupSkillJob = job[0];
            return groupSkillJob;
        }
        else{
            return job;
        }
    }

    render() {
        return (
            <div id="main">
                <div className="inner">
                    <h1>{this.state.job.ten_cong_viec} <span className="pull-right">60 000 {this.state.job.don_vi_tien_te}</span></h1>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-7">
                                <img className="d-block w-100" src="https://www.isbglobalservices.com/images/layout/f1.jpg" alt="First slide" />
                            </div>

                            <div className="col-lg-5">
                                <h3>Short Description</h3>

                                <p>- Medical / Health Jobs <br /> - London <br /> - 20-06-2020  <br />  - Contract</p>
                                <Link 
                                    to={{ pathname: `/apply-job/${qs.parse(this.props.location.search).ma_cv}`, query: {ma_doanh_nghiep: qs.parse(this.props.location.search).ma_dn, ma_cong_viec: qs.parse(this.props.location.search).ma_cv}}} 
                                    className="button primary" 
                                >
                                    Apply for this job
                                </Link>
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />

                    <div className="container-fluid">
                        <br />
                        <br />

                        <div className="row">
                            <div className="col-md-3">
                                <h3>Contact Details</h3>

                                <ul className="alt">
                                    <li><span className="fa fa-user"></span> John Smith</li>
                                    <li><span className="fa fa-phone"></span> +1 333 4040 5566 </li>
                                    <li><span className="fa fa-mobile-phone"></span> +1 333 4040 5566 </li>
                                    <li><span className="fa fa-envelope-o"></span> <a href="#">john@carsales.com</a></li>
                                    <li><a href="http://www.cannonguards.com/">http://www.cannonguards.com/</a></li>

                                </ul>
                            </div>

                            <div className="col-md-9">
                                <h3>Full Description</h3>

                                <pre>{this.state.job.mo_ta_cong_viec}</pre>
                            </div>
                        </div>

                        <h3>About Company</h3>

                        <p>{this.state.job.mo_ta_cong_ty}</p>
                    </div>
                </div>
            </div>
        )
    }
}