import React, { Component } from 'react';

import $ from 'jquery';

import './login.scoped.css';
import Image from './images/img-01.png';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';

export class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			logginFailMessage: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		<script src="./vendor/bootstrap/js/bootstrap.min.js" />;
		<script src="./vendor/select2/select2.min.js" />;
		<script src="./vendor/tilt/tilt.jquery.min.js" />;

		var input = $('.validate-input .input100');

		$('.validate-form').on('submit', function() {
			var check = true;

			for (var i = 0; i < input.length; i++) {
				if (validate(input[i]) === false) {
					showValidate(input[i]);
					check = false;
				}
			}

			return check;
		});

		$('.validate-form .input100').each(function() {
			$(this).focus(function() {
				hideValidate(this);
			});
		});

		function validate(input) {
			if (
				$(input).attr('type') === 'email' ||
				$(input).attr('name') === 'email'
			) {
				if (
					$(input)
						.val()
						.trim()
						.match(
							// eslint-disable-next-line no-useless-escape
							/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
						) === null
				) {
					return false;
				}
			} else {
				if (
					$(input)
						.val()
						.trim() === ''
				) {
					return false;
				}
			}
		}

		function showValidate(input) {
			var thisAlert = $(input).parent();

			$(thisAlert).addClass('alert-validate');
		}

		function hideValidate(input) {
			var thisAlert = $(input).parent();

			$(thisAlert).removeClass('alert-validate');
		}
	}

	handleChange(event) {
		if (event.target.name === 'email') {
			this.setState({ email: event.target.value });
		} else {
			this.setState({ password: event.target.value });
		}
	}

	async handleSubmit(event) {
		try {
			event.preventDefault();
			const loginInfo = {
				email: this.state.email,
				password: this.state.password,
			};
			const response = await fetch(process.env.REACT_APP_API_LOGIN, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginInfo),
			});
			const data = await response.json();
			if (data['code'] === 200) {
				localStorage.setItem('token', data['data']);
				window.location.pathname = '/';
			} else if (data['code'] === 203) {
				this.setState({ logginFailMessage: data['error'] });
			} else {
				this.setState({
					logginFailMessage: 'An error occures when login!',
				});
			}
		} catch (err) {
			this.setState({
				logginFailMessage: 'An error occures when login!',
			});
			console.log(err);
		}
	}

	render() {
		return (
			<div className="Login">
				<div className="container-login100">
					<div className="wrap-login100">
						<div className="login100-pic">
							<img src={Image} alt="IMG" />
						</div>

						<form
							className="login100-form validate-form"
							onSubmit={this.handleSubmit}
						>
							<span className="login100-form-title">
								Member Login
							</span>

							<em className="text-danger ml-4">
								{this.state.logginFailMessage}
							</em>
							<div
								className="wrap-input100 validate-input"
								data-validate="Valid email is required: ex@abc.xyz"
							>
								<input
									className="input100"
									type="text"
									name="email"
									placeholder="Email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
								<span className="focus-input100" />
								<span className="symbol-input100">
									<i
										className="fa fa-envelope"
										aria-hidden="true"
									/>
								</span>
							</div>
							<div
								className="wrap-input100 validate-input"
								data-validate="Password is required"
							>
								<input
									className="input100"
									type="password"
									name="pass"
									placeholder="Password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
								<span className="focus-input100" />
								<span className="symbol-input100">
									<i
										className="fa fa-lock"
										aria-hidden="true"
									/>
								</span>
							</div>
							<div className="container-login100-form-btn">
								<button
									type="submit"
									className="login100-form-btn"
								>
									Login
								</button>
							</div>
							<div className="text-center p-t-12">
								<span className="txt1">Forgot </span>
								<a className="txt2" href="/">
									Username / Password?
								</a>
							</div>
							<div className="text-center p-t-136">
								<a className="txt2" href="/">
									Create your Account
									<i
										className="fa fa-long-arrow-right m-l-5"
										aria-hidden="true"
									/>
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
