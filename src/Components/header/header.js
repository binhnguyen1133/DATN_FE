import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router-dom';
import { loginToken } from '../../services/api.js';
import './header.css';
import { SearchBar } from './search-bar/search-bar';

export class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			role: undefined,
			isLogin: false
		};

		this.checkLogin = this.checkLogin.bind(this);
		this.checkRole = this.checkRole.bind(this);
		this.signOut = this.signOut.bind(this);
	}

	async componentDidMount() {
		// console.log('Header');
		const account = await this.checkRole();
		console.log(account);
		if (account !== null) {
			if (Object.keys(account).indexOf('ma_dn') > -1) {
				this.setState({
					role: 'dn',
				});
			}
			if (Object.keys(account).indexOf('ma_kh') > -1 && Object.keys(account).indexOf('ma_dn') === -1) {
				this.setState({
					role: 'kh',
				});
			}
		}

		this.checkLogin();

		// Menu.
		var $menu = $('#menu');
		var $topbar = $('#topbar');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {
			if ($menu._locked) return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;
		};

		$menu._show = function() {
			if ($menu._lock()) $topbar.addClass('is-menu-visible');
		};

		$menu._hide = function() {
			if ($menu._lock()) $topbar.removeClass('is-menu-visible');
		};

		$menu._toggle = function() {
			if ($menu._lock()) $topbar.toggleClass('is-menu-visible');
		};

		$menu
			.appendTo($topbar)
			.on('click', function(event) {
				// event.stopPropagation();
			})
			.on('click', 'a', function(event) {
				var href = $(this).attr('href');

				event.preventDefault();
				// event.stopPropagation();

				// Hide.
				$menu._hide();

				// Redirect.
				if (href === '#menu') return;

				window.setTimeout(function() {
					console.log(href);
					window.location.href = href;
				}, 0);
			})
			.append('<a class="close" href="#menu">Close</a>');

		$topbar
			.on('click', 'a[href="#menu"]', function(event) {
				event.stopPropagation();
				event.preventDefault();

				// Toggle.
				$menu._toggle();
			})
			.on('click', function(event) {
				// Hide.
				$menu._hide();
			})
			.on('keydown', function(event) {
				// Hide on escape.
				if (event.keyCode === 27) $menu._hide();
			});
	}

	checkLogin() {
		const token = localStorage.getItem("token");
		if(token){
			this.setState({isLogin: true}); 
			return localStorage.getItem('token')
		}
		return localStorage.getItem("token");
	}

	async checkRole() {
		const token = this.checkLogin();
		console.log("role");
		if (token) {
			const res = await loginToken(token);
			return res;
		}
		return null;
	}

	signOut(e) {
		// e.preventDefault();
		console.log('signOut');
		localStorage.removeItem("token");
		this.setState({
			role: undefined,
		});
	}

	render() {
		return (
			// <BrowserRouter>
				<div id="topbar">
					<header id="header">
						<div className="inner">
							<Link to={`/`} className="logo">
								<span className="fa fa-briefcase" />{' '}
								<span className="title">
									Job Agency Website
								</span>
							</Link>
							<nav>
								<ul>
									<li>
										<a href="#menu">Menu</a>
									</li>
								</ul>
							</nav>
						</div>
					</header>
					<SearchBar />
					<nav id="menu">
						<h2>Menu</h2>
						<ul>
							<li>
								<Link to='/'>Home</Link>
							</li>
							{this.state.role === 'dn' ? (
								<li>
									<Link to="/create/job">Post a job</Link>
								</li>
							) : null}
							{this.state.role === 'dn' ? (
								<li>
									<Link to="/manage-job">Manage Job</Link>
								</li>
							 ) : null}
							<li>
								<Link to="/about">About us</Link>
							</li>
							{this.state.isLogin ? (
								<li id="sign-out-btn">
										{/* <button onClick={this.signOut.bind(this)}>Sign out</button> */}
									<Link to="/" onClick={this.signOut}>Sign out</Link>
								</li>
							): null} 
							{!this.state.isLogin ? (
								<li>
									<Link to="/login">Login</Link>
								</li>
							) : null}
							
							{!this.state.isLogin ? (
								<li>
									<Link to="/register">Sign up</Link>
								</li>
							) : null}
						</ul>
					</nav>
				</div>
			// </BrowserRouter>
		);
	}
}

export default Header;
