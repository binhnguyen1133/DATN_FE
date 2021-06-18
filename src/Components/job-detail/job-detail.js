import React from 'react';
import './job-detail.scoped.css';
import qs from 'query-string';
import _, { join } from 'lodash';
import { Link } from 'react-router-dom';
import ApplyJob from '../apply-job/apply-job';
import {
	addMyJob,
	getToken,
	getMyJob,
	CheckJobExistInMyJob,
	deteleFavoriteJob
} from '../../services/api.js';

export class JobDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			job: {
				data: {}
			},
		};
		this.addMyFavoriteJob = this.addMyFavoriteJob.bind(this);
		this.deleteMyFavoriteJob = this.deleteMyFavoriteJob.bind(this);
	}

	async componentDidMount() {
		const queryParams = qs.parse(this.props.location.search);
		if(queryParams.ma_dn != "undefined") {
		fetch(
			`${process.env.REACT_APP_API_JOB_DETAIL}?ma_dn=${
				queryParams.ma_dn
			}&ma_cv=${queryParams.ma_cv}`
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						job: this.groupSkill(result.data),
					});
					console.log(this.state.job);
					const checkJobExist = CheckJobExistInMyJob(this.state.job.ma_cong_viec).then((check) => {
						this.setState({
							favoriteJob: check.data
						});
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
		}
		if(queryParams.ma_dn === "undefined") {
			fetch(
				`https://www.timkiemvieclam.tech/api/v1/jobs/${queryParams.ma_cv}`
			)
				.then((res) => res.json())
				.then(
					(result) => {
						this.setState({
							isLoaded: true,
							job: result.data,
						});
						console.log(this.state.job);
						const checkJobExist = CheckJobExistInMyJob(this.state.job.ma_cong_viec).then((check) => {
							this.setState({
								favoriteJob: check.data
							});
						});
					},
					// Note: it's important to handle errors here
					// instead of a catch() block so that we don't swallow
					// exceptions from actual bugs in components.
					(error) => {
						this.setState({
							isLoaded: true,
							error,
						});
					}
				);
			}
			const token = getToken();
			console.log(token);
		
	}

	groupSkill(job) {
        let groupSkillJob;
        if ((job.length > 1)) {
            var array = [];
            _.forEach(job, function (j) {
                array = _.concat(array, j.ten_skill)
            })
            job[0].ten_skill = array;
        }
        groupSkillJob = job[0];
        return groupSkillJob;
    }

	async addMyFavoriteJob() {
		console.log(this.state.job.ma_cong_viec);
		let job = {
			ma_cong_viec: this.state.job.ma_cong_viec
		};
		const res = await addMyJob(job);
		CheckJobExistInMyJob(this.state.job.ma_cong_viec).then((check) => {
			this.setState({
				favoriteJob: check.data
			});
		});
		console.log(res);
	}

	async deleteMyFavoriteJob() {
		const res = await deteleFavoriteJob(this.state.job.ma_cong_viec);
		console.log(res);
		CheckJobExistInMyJob(this.state.job.ma_cong_viec).then((check) => {
			this.setState({
				favoriteJob: check.data
			});
		});
	}

	render() {
		return (
			<div id="main">
				<div className="inner">
					<h1>
						{this.state.job.ten_cong_viec}{' '}
						<span className="pull-right">
						{this.state.job.luong_toi_thieu}-{this.state.job.luong_toi_da} {this.state.job.don_vi_tien_te}
						</span>
					</h1>

					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-7">
								<img
									className="d-block w-100"
									src="https://www.isbglobalservices.com/images/layout/f1.jpg"
									alt="First slide"
								/>
							</div>

							<div className="col-lg-5">
								<h3>Short Description</h3>
								<p>
									- Medical / Health Jobs <br /> - London{' '}
									<br /> - 20-06-2020 <br /> - Contract
								</p>
								<Link
									to={{
										pathname: `/apply-job/${
											this.state.job.ma_cong_viec
										}`,
										query: {
											ma_doanh_nghiep: this.state.job
												.ma_doanh_nghiep,
											ma_cong_viec: this.state.job
												.ma_cong_viec,
										},
									}}
									className="button primary"
								>
									Apply for this job
								</Link>
								<br></br>
								<br></br>
								<br></br>

							{(this.state.favoriteJob == false) && (<button type="button" class="btn btn-info" onClick={this.addMyFavoriteJob}><i class="fas fa-star"></i> Thêm vào yêu thích</button>)}
							{(this.state.favoriteJob == true) && (<button type="button" class="btn btn-secondary" onClick={this.deleteMyFavoriteJob}><i class="fas fa-star"></i> Đã yêu thích</button>)}			
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
									<li>
										<span className="fa fa-user" /> John
										Smith
									</li>
									<li>
										<span className="fa fa-phone" /> +1 333
										4040 5566{' '}
									</li>
									<li>
										<span className="fa fa-mobile-phone" />{' '}
										+1 333 4040 5566{' '}
									</li>
									<li>
										<span className="fa fa-envelope-o" />{' '}
										<a href="#">john@carsales.com</a>
									</li>
									<li>
										<a href="http://www.cannonguards.com/">
											http://www.cannonguards.com/
										</a>
									</li>
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
		);
	}
}
