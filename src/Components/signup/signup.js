import React from 'react';

import { register } from '../../services/api.js';

export class SignUpComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				email: '',
				password: '',
				ten_kh: '',
				sdt: '',
				password_confirm: '',
			},
			signupFailMessage: '',
			signupFail: false,
			confirmPasswordFail: false,
			emailValidate: true,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
	}

	handleConfirmPassword(e) {
		let form = this.state.form;
		form['password_confirm'] = e.target.value;
		this.setState(
			{
				form,
			},
			() => {
				if (
					this.state.form.password_confirm !==
					this.state.form.password
				) {
					this.setState({
						confirmPasswordFail: true,
					});
				} else {
					this.setState({
						confirmPasswordFail: false,
					});
				}
			}
		);
	}

	validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	handleInputChange(e) {
		let form = this.state.form;
		form[e.target.name] = e.target.value;
		this.setState({ form });
	}

	async handleSubmit(e) {
		e.preventDefault();
		if (!this.validateEmail(this.state.form.email)) {
			this.setState({
				emailValidate: false,
			});
			return;
		}
		try {
			const res = await register(this.state.form);
			if (res['error']) {
				this.setState({
					signupFail: true,
					signupFailMessage: res['error'],
				});
			} else if (res['code'] === 200) {
				window.location.pathname = '/login';
			} else {
				this.setState({
					signupFail: true,
					signupFailMessage: 'Some error occur when signup',
				});
			}
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		const { form } = this.state;
		const keys = Object.keys(form).map((i, idx) => idx);
		return (
			<div class="container">
				<div class="row justify-content-center">
					<div
						class="
				col-xs-10
				col-xs-offset-1
				col-sm-8
				col-sm-offset-2
				col-md-8
				col-md-offset-2
			"
					>
						<form class="form-horizontal" method="post" action="#">
							<br />
							<fieldset>
								<h2 class="text-center mb-4">
									Register to become our member
								</h2>
								{this.state.signupFail ? (
									<div className="alert alert-danger">
										{this.state.signupFailMessage}
									</div>
								) : null}

								{this.state.confirmPasswordFail ? (
									<div className="alert alert-danger">
										Password does not match
									</div>
								) : null}
								{!this.state.emailValidate ? (
									<div className="alert alert-danger">
										Wrong email format
									</div>
								) : null}
								<div class="form-group">
									<label
										for="ten_kh"
										class="cols-sm-2 control-label"
									>
										Your Name
									</label>
									<div class="cols-sm-10">
										<div class="input-group">
											<input
												type="text"
												value={form.ten_kh}
												key={keys.indexOf('ten_kh')}
												class="form-control"
												name="ten_kh"
												id="ten_kh"
												placeholder="Enter your Name"
												required
												onChange={
													this.handleInputChange
												}
											/>
										</div>
									</div>
								</div>

								<div class="form-group">
									<label
										for="email"
										class="cols-sm-2 control-label"
									>
										Your Email
									</label>
									<div class="cols-sm-10">
										<div class="input-group">
											<input
												type="email"
												class="form-control"
												name="email"
												id="email"
												value={form.email}
												key={keys.indexOf('email')}
												placeholder="Enter your Email"
												onChange={
													this.handleInputChange
												}
												required
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label
										for="sdt"
										class="cols-sm-2 control-label"
									>
										Your Phone Number
									</label>
									<div class="cols-sm-10">
										<div class="input-group">
											<input
												type="text"
												class="form-control"
												name="sdt"
												id="sdt"
												value={form.sdt}
												key={keys.indexOf('sdt')}
												placeholder="Enter your sdt number"
												onChange={
													this.handleInputChange
												}
												required
											/>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label
										for="password"
										class="cols-sm-2 control-label"
									>
										Password
									</label>
									<div class="cols-sm-10">
										<div class="input-group">
											<input
												type="password"
												class="form-control"
												name="password"
												id="password"
												value={form.password}
												key={keys.indexOf('password')}
												placeholder="Enter your Password"
												onChange={
													this.handleInputChange
												}
												required
											/>
										</div>
									</div>
								</div>

								<div class="form-group">
									<label
										for="confirm"
										class="cols-sm-2 control-label"
									>
										Confirm Password
									</label>
									<div class="cols-sm-10">
										<div class="input-group">
											<input
												type="password"
												class="form-control"
												name="confirm"
												id="confirm"
												value={
													this.state.password_confirm
												}
												key={keys.indexOf('name') + 1}
												placeholder="Confirm your Password"
												onChange={
													this.handleConfirmPassword
												}
											/>
										</div>
									</div>
								</div>

								<div class="form-group">
									<button
										type="button"
										class="btn btn-info btn-lg btn-block login-button"
										onClick={this.handleSubmit}
									>
										Register
									</button>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default SignUpComponent;
