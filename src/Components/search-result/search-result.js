import React from 'react';

import { Link } from 'react-router-dom';
import { Pagination } from '../../Barrel/index.js';
import Filter from '../filter/filter.js';
import './search-result.scoped.css';

export class SearchResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobs: [],
			value: '',
			pageIndex: 0,
			skipRelatedRecords: 0,
			skipNormalizeRecords: 0,
			totalRecord: null,
			jobsByFilter: [],
			cities: [],
			selectedTime: Infinity,
			SelectedSalary: -Infinity,
			selectedCity: 'All',
		};
		this.getJobs = this.getJobs.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.changeDate = this.changeDate.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.sortByDate = this.sortByDate.bind(this);
		this.sortJobs = this.sortJobs.bind(this);
	}

	async componentDidMount() {
		const id = decodeURIComponent(this.props.match.params.id);

		await this.getJobs(
			id,
			this.state.pageIndex,
			this.state.skipRelatedRecords,
			this.state.skipNormalizeRecords
		);
	}

	handlePageChange(newPage, skipRelatedRecords, skipNormalizeRecords) {
		this.getJobs(
			decodeURIComponent(this.props.match.params.id),
			newPage,
			skipRelatedRecords,
			skipNormalizeRecords
		);
	}

	filterByTime(filterTime, jobForFilter) {
		let filterResult = [];
		const currDate = new Date();
		for (let jobType in jobForFilter) {
			filterResult.push([jobForFilter[jobType][0], []]);
			for (let job of jobForFilter[jobType][1]) {
				let jobStart = new Date(job['ngay_bat_dau']);
				let dateDiff = Math.floor(
					(currDate.getTime() - jobStart.getTime()) /
						(1000 * 3600 * 24)
				);
				if (dateDiff <= filterTime) {
					filterResult[jobType][1].push(job);
				}
			}
		}
		return filterResult;
	}

	filterByCity(filterCity, jobForFilter) {
		let filterResult = [];

		if (filterCity == 'All') {
			return jobForFilter;
		}

		for (let jobType in jobForFilter) {
			filterResult.push([jobForFilter[jobType][0], []]);
			for (let job of jobForFilter[jobType][1]) {
				if (job['thanh_pho'] && job['thanh_pho'].trim() == filterCity) {
					filterResult[jobType][1].push(job);
				}
			}
		}

		return filterResult;
	}

	filterBySalary(filterSalary, jobForFilter) {
		let filterResult = [];

		if (filterSalary == -Infinity) {
			return jobForFilter;
		}
		if (filterSalary == Infinity) {
			for (let jobType in jobForFilter) {
				filterResult.push([jobForFilter[jobType][0], []]);
				for (let job of jobForFilter[jobType][1]) {
					if (job['luong_toi_da'] && job['luong_toi_da'] > 1500) {
						filterResult[jobType][1].push(job);
					}
				}
			}
			return filterResult;
		}
		for (let jobType in jobForFilter) {
			filterResult.push([jobForFilter[jobType][0], []]);
			for (let job of jobForFilter[jobType][1]) {
				if (
					job['luong_toi_da'] &&
					(job['luong_toi_da'] > filterSalary - 500 &&
						job['luong_toi_da'] <= filterSalary)
				) {
					filterResult[jobType][1].push(job);
				}
			}
		}
		return filterResult;
	}

	handleFilterChange(filterTime, filterSalary, filterCity) {
		const jobForFilter = this.state.jobs;

		let filterResult = this.filterByTime(filterTime, jobForFilter);
		filterResult = this.filterBySalary(filterSalary, filterResult);
		filterResult = this.filterByCity(filterCity, filterResult);

		this.setState({
			jobsByFilter: filterResult,
			selectedTime: filterTime,
			SelectedSalary: filterSalary,
			selectedCity: filterCity,
		});
	}

	changeDate(date) {
		var newDate = new Date(date);
		return newDate.toDateString();
	}

	sortByDate(arr) {
		arr.sort(
			(a, b) => new Date(b['ngay_bat_dau']) - new Date(a['ngay_bat_dau'])
		);
	}
	sortJobs(jobs) {
		this.sortByDate(jobs['jobsSearchResult']);
		this.sortByDate(jobs['jobsInRelatedSkill']);
		this.sortByDate(jobs['jobsAfterNormalize']);
	}

	getDistinctCities(jobs) {
		const cities = [];
		jobs.map((item) => {
			item[1].map((job) => {
				if (job['thanh_pho']) {
					cities.push(job['thanh_pho'].trim());
				}
			});
		});
		console.log(cities);
		const distinctCities = [...new Set(cities)];
		let cityValues = [];
		distinctCities.map((item, idx) => {
			cityValues.push({
				id: idx + 1,
				name: item,
				value: item,
			});
		});
		return cityValues;
	}

	async getJobs(
		searchKey,
		newPage,
		skipRelatedRecords,
		skipNormalizeRecords
	) {
		const params = {
			searchKey: searchKey,
			pageIndex: newPage,
			skipRelatedRecords: skipRelatedRecords,
			skipNormalizeRecords: skipNormalizeRecords,
		};
		const query = new URLSearchParams(params).toString();
		const res = await fetch(
			`${process.env.REACT_APP_API_SEARCH}/?${query}`
		);
		const data = await res.json();
		let jobs = data.data.data;
		this.sortJobs(jobs);

		this.setState(
			function() {
				return {
					jobs: Object.entries(jobs),
					pageIndex: data.data.pageIndex,
					skipRelatedRecords: data.data.skipRelatedRecords,
					skipNormalizeRecords: data.data.skipNormalizeRecords,
					totalRecord: data.data.totalRecord,
				};
			},
			() => {
				let distinctCities = this.getDistinctCities(this.state.jobs);
				this.setState({
					jobsByFilter: [...this.state.jobs],
					cities: distinctCities,
				});
				this.handleFilterChange(
					this.state.selectedTime,
					this.state.SelectedSalary,
					this.state.selectedCity
				);
				window.scrollTo(0, 0);
				console.log('Scroll to top');
			}
		);
	}

	render() {
		if (this.state.totalRecord == null) {
			return (
				<div className="d-flex justify-content-center mt-5">
					<div
						className="spinner-border text-dark"
						style={{ width: '10rem', height: '10rem' }}
						role="status"
					>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}
		if (this.state.totalRecord === 0) {
			return (
				<div>
					<h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
						NOT FOUND ANY RESULTS
					</h1>
				</div>
			);
		}
		return (
			<div>
				<Filter
					cities={this.state.cities}
					onFilter={(filterTime, filterSalary, filterCity) =>
						this.handleFilterChange(
							filterTime,
							filterSalary,
							filterCity
						)
					}
				/>
				{/* <Filter onDateChange={this.handleDateChange} onSalaryChange={this.handleSalaryChange} /> */}
				<div className="result-jobs">
					{this.state.jobsByFilter.map((item, key) => {
						if (item[1].length !== 0) {
							return (
								<div className="container" key={key}>
									<h1>
										{(() => {
											switch (item[0]) {
												case 'jobsSearchResult':
													return 'Result Jobs';
												case 'jobsInRelatedSkill':
													return 'Jobs Related';
												case 'jobsAfterNormalize':
													return 'Job Normalize';
												default:
													return null;
											}
										})()}
									</h1>

									<div className="row">
										<div className="col-12">
											<div className="card card-margin">
												<div className="card-body">
													<div className="row search-body">
														<div className="col-lg-12">
															<div className="search-result">
																<div className="result-header">
																	<div className="row">
																		<div className="col-lg-6">
																			<div className="records">
																				Showing:{' '}
																				<b>
																					{
																						item[1]
																							.length
																					}
																				</b>{' '}
																				result
																			</div>
																		</div>
																		<div className="col-lg-6">
																			<div className="result-actions" />
																		</div>
																	</div>
																</div>
																<div className="result-body">
																	<div className="table-responsive">
																		<table className="table widget-26">
																			<thead>
																				<tr>
																					<td
																						style={{
																							fontWeight:
																								'bold',
																						}}
																					>
																						Tên
																						công
																						việc
																					</td>
																					<td
																						style={{
																							fontWeight:
																								'bold',
																						}}
																					>
																						Địa
																						chỉ
																					</td>
																					<td
																						style={{
																							fontWeight:
																								'bold',
																						}}
																					>
																						Lương
																					</td>
																					<td
																						style={{
																							fontWeight:
																								'bold',
																						}}
																					>
																						Skill
																					</td>
																				</tr>
																			</thead>
																			{item[1].map(
																				(
																					job
																				) => (
																					<tbody
																						key={
																							job.ma_cong_viec
																						}
																					>
																						<tr>
																							<td>
																								<div className="widget-26-job-title">
																									<Link
																										to={`/job/?ma_dn=${
																											job.ma_doanh_nghiep
																										}&ma_cv=${
																											job.ma_cong_viec
																										}`}
																									>
																										{
																											job.ten_cong_viec
																										}
																									</Link>
																									<p className="m-0">
																										<a
																											href="/"
																											className="employer-name"
																										>
																											{
																												job.ten_cong_ty
																											}
																										</a>{' '}
																										<br />
																										<span className="text-muted time">
																											{this.changeDate(
																												job.ngay_bat_dau
																											)}
																										</span>
																									</p>
																								</div>
																							</td>
																							<td>
																								<div className="widget-26-job-info">
																									<p className="text-muted m-0">
																										<span className="location">
																											{
																												job.dia_chi
																											}
																										</span>
																									</p>
																								</div>
																							</td>
																							<td>
																								<div className="widget-26-job-salary">
																									{job.luong_toi_da
																										? job.luong_toi_da
																										: `You'll love it!`}
																								</div>
																							</td>
																							<td>
																								{job.skills.map(
																									(
																										skill,
																										key
																									) => (
																										<div
																											className="widget-26-job-category bg-soft-base"
																											key={
																												key
																											}
																										>
																											<i className="indicator bg-info" />
																											<span>
																												{
																													skill
																												}
																											</span>
																											<br />
																										</div>
																									)
																								)}
																							</td>
																							<td>
																								<div className="widget-26-job-starred">
																									<a href="/">
																										<svg
																											xmlns="http://www.w3.org/2000/svg"
																											width="24"
																											height="24"
																											viewBox="0 0 24 24"
																											fill="none"
																											stroke="currentColor"
																											strokeWidth="2"
																											strokeLinecap="round"
																											strokeLinejoin="round"
																											className="feather feather-star"
																										>
																											<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
																										</svg>
																									</a>
																								</div>
																							</td>
																						</tr>
																					</tbody>
																				)
																			)}
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						}
					})}
					<Pagination
						onPageChange={this.handlePageChange}
						pageIndex={this.state.pageIndex}
						totalRecord={this.state.totalRecord}
						skipRelatedRecords={this.state.skipRelatedRecords}
						skipNormalizeRecords={this.state.skipNormalizeRecords}
					/>
				</div>
			</div>
		);
	}
}

export default SearchResult;
