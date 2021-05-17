import React from 'react';

import moment from 'moment';

import {
	requestJob,
	getSkillSuggestion,
	getToken,
} from '../../services/api.js';

import './createJob.scoped.css';
import { Link } from 'react-router-dom';

export class CreateJob extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				jobTitle: '',
				unit: 'USD',
				maxSalary: '',
				minSalary: '',
				startDate: moment(new Date()).format('YYYY-MM-DD'),
				endDate: '',
				detail: '',
				skills: [],
			},
			currSkill: '',
			suggestions: [],
			value: '',
			addJobSuccess: false,
			addJobFail: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onKeyUp = this.handleSkillInput.bind(this);
		this.handleSkillChange = this.handleSkillChange.bind(this);
		this.removeSkill = this.removeSkill.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	renderSuggestion() {
		const { suggestions } = this.state;
		if (suggestions.length === 0) return null;
		return (
			<ul className="listItems">
				{suggestions.map((item, key) => (
					<li
						key={key}
						className="suggestionItems"
						onClick={this.handleSkillInput.bind(this, {
							charCode: 14,
							skill: item,
						})}
					>
						{item}
					</li>
				))}
			</ul>
		);
	}

	async handleSubmit(e) {
		e.preventDefault();
		try {
			const token = getToken();
			if (token) {
				const job = {
					ten_cong_viec: this.state.form.jobTitle,
					don_vi_tien_te: this.state.form.unit,
					luong_toi_thieu: Number(this.state.form.minSalary),
					luong_toi_da: Number(this.state.form.maxSalary),
					ngay_bat_dau: this.state.form.startDate,
					ngay_ket_thuc: this.state.form.endDate,
					mo_ta_cong_viec: this.state.form.detail,
					danh_sach_skill: this.state.form.skills.join(','),
				};
				const res = await requestJob(job, token);
				if (res['success'] === true) {
					this.setState({
						addJobSuccess: true,
					});
				} else {
					this.setState({
						addJobFail: true,
					});
				}
			} else {
				this.setState({
					addJobFail: true,
				});
			}
		} catch (e) {
			console.log(e);
		}
	}

	handleInputChange(e) {
		let form = this.state.form;
		form[e.target.name] = e.target.value;
		this.setState({ form });
	}

	async handleSkillChange(e) {
		this.setState({
			currSkill: e.target.value,
		});
		if (e.target.value) {
			var res = await getSkillSuggestion(e.target.value);
		} else {
			this.setState({
				suggestions: [],
			});
		}
		if (e.target.value !== '') {
			this.setState({
				suggestions: res,
			});
		}
	}

	handleSkillInput(e) {
		if (e.charCode === 13) {
			let form = this.state.form;
			form['skills'] = [...form['skills'], this.state.currSkill];
			this.setState({
				form,
				currSkill: '',
				suggestions: [],
			});
			e.target.value = '';
			this.renderSuggestion();
		}
		if (e.charCode === 14) {
			let form = this.state.form;
			form['skills'] = [...form['skills'], e.skill];
			this.setState({
				form,
				currSkill: '',
				suggestions: [],
			});
			this.renderSuggestion();
		}
	}

	removeSkill(e) {
		let form = this.state.form;
		form['skills'].splice(e, 1);
		this.setState({
			form,
		});
	}

	hideModal(e) {
		const modal_backdrop = document.querySelector('.modal-backdrop');
		modal_backdrop.remove();
	}

	render() {
		const { form } = this.state;
		const keys = Object.keys(form).map((i, idx) => idx);
		return (
			<div className="main">
				<div className="container">
					<h2 className="header">
						Fill in all fields below to post a job
					</h2>
					{this.state.addJobSuccess ? (
						<div className="alert alert-success">
							Add post successfully. Please wait for approving
							from admin
							<Link to="/"> Back to home</Link>
						</div>
					) : null}
					{this.state.addJobFail ? (
						<div className="alert alert-danger">
							There are some errors occur, please try again
						</div>
					) : null}
					<form className="mt-4" style={{ overflow: 'visible' }}>
						<div className="form-group">
							<input
								className=" form-control"
								placeholder="Tên công việc"
								name="jobTitle"
								value={form.jobTitle}
								onChange={this.handleInputChange}
								key={keys.indexOf('jobTitle')}
							/>
						</div>
						<div className="form-row mb-3">
							<div className="col">
								<input
									className=" form-control"
									placeholder="Lương tối thiểu"
									name="minSalary"
									value={form.minSalary}
									onChange={this.handleInputChange}
									key={keys.indexOf('minSalary')}
								/>
							</div>
							<div className="col">
								<input
									className=" form-control"
									placeholder="Lương tối đa"
									name="maxSalary"
									value={form.maxSalary}
									onChange={this.handleInputChange}
									key={keys.indexOf('maxSalary')}
								/>
							</div>
							<div className="col">
								<select
									className="form-control"
									name="unit"
									id=""
									value={form.unit}
									onChange={this.handleInputChange}
								>
									<option value="USD">USD</option>
									<option value="EURO">EURO</option>
									<option value="VND">VND</option>
								</select>
							</div>
						</div>
						<div className="form-row mb-3">
							<div className="col">
								<input
									className=" form-control"
									placeholder="Ngày bắt đầu (YYYY-MM-DD)"
									name="startDate"
									value={form.startDate}
									onChange={this.handleInputChange}
									key={keys.indexOf('startDate')}
								/>
							</div>
							<div className="col">
								<input
									className="form-control"
									placeholder="Ngày kết thúc (YYYY-MM-DD)"
									name="endDate"
									value={form.endDate}
									onChange={this.handleInputChange}
									key={keys.indexOf('endDate')}
								/>
							</div>
						</div>
						<div
							className="form-group"
							style={{ position: 'relative' }}
						>
							<input
								className="form-control"
								placeholder="Kỹ năng"
								name="skills"
								onChange={this.handleSkillChange}
								onKeyPress={this.onKeyUp}
								value={this.state.currSkill}
								key={keys.indexOf('skills')}
							/>
							{this.renderSuggestion()}
							<div className="mt-2">
								{this.state.form.skills.map((skill, idx) => (
									<div className="skill-box mr-1" key={idx}>
										<span>{skill}</span>
										<div
											className="remove-skill"
											onClick={this.removeSkill.bind(
												null,
												idx
											)}
										>
											<i className="fa fa-times-circle" />
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="form-group">
							<textarea
								className="form-control"
								value={form.detail}
								name="detail"
								placeholder="Mô tả công việc"
								rows="5"
								onChange={this.handleInputChange}
								key={keys.indexOf('detail')}
							/>
						</div>

						<button
							className="btn btn-primary mt-2"
							onClick={this.handleSubmit}
							type="button"
						>
							Request job
						</button>

						<button
							type="button"
							className="btn btn-danger mt-2 ml-2"
							data-toggle="modal"
							data-target="#exampleModal"
						>
							Cancel
						</button>
					</form>
					<div
						className="modal fade"
						id="exampleModal"
						tabIndex="-1"
						role="dialog"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5
										className="modal-title"
										id="exampleModalLabel"
									>
										Cancel this job?
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									Are you sure that you want to cancel posting
									this job
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										data-dismiss="modal"
									>
										Đóng
									</button>
									<Link
										to="/"
										type="button"
										className="btn btn-primary"
										onClick={this.hideModal}
									>
										Đồng ý
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
